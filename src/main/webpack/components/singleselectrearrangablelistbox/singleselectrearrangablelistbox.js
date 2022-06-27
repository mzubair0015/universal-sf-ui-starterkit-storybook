/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

'use strict';

/**
 * @namespace aria
 */
var aria = aria || {};

/**
 * @class
 * @description
 *  Listbox object representing the state and interactions for a listbox widget
 * @param listboxNode
 *  The DOM node pointing to the listbox
 */
aria.Listbox = function (listboxNode) {
  this.listboxNode = listboxNode;
  this.activeDescendant = this.listboxNode.getAttribute(
    'aria-activedescendant'
  );
  this.multiselectable = this.listboxNode.hasAttribute('aria-multiselectable');
  this.moveUpDownEnabled = false;
  this.siblingList = null;
  this.startRangeIndex = 0;
  this.upButton = null;
  this.downButton = null;
  this.moveButton = null;
  this.keysSoFar = '';
  this.handleFocusChange = function () {};
  this.handleItemChange = function () {};
  this.registerEvents();
};

/**
 * @description
 *  Register events for the listbox interactions
 */
aria.Listbox.prototype.registerEvents = function () {
  this.listboxNode.addEventListener('focus', this.setupFocus.bind(this));
  this.listboxNode.addEventListener('keydown', this.checkKeyPress.bind(this));
  this.listboxNode.addEventListener('click', this.checkClickItem.bind(this));

  if (this.multiselectable) {
    this.listboxNode.addEventListener(
      'mousedown',
      this.checkMouseDown.bind(this)
    );
  }
};

/**
 * @description
 *  If there is no activeDescendant, focus on the first option
 */
aria.Listbox.prototype.setupFocus = function () {
  if (this.activeDescendant) {
    return;
  }
};

/**
 * @description
 *  Focus on the first option
 */
aria.Listbox.prototype.focusFirstItem = function () {
  var firstItem = this.listboxNode.querySelector('[role="option"]');

  if (firstItem) {
    this.focusItem(firstItem);
  }
};

/**
 * @description
 *  Focus on the last option
 */
aria.Listbox.prototype.focusLastItem = function () {
  var itemList = this.listboxNode.querySelectorAll('[role="option"]');

  if (itemList.length) {
    this.focusItem(itemList[itemList.length - 1]);
  }
};

/**
 * @description
 *  Handle various keyboard controls; UP/DOWN will shift focus; SPACE selects
 *  an item.
 * @param evt
 *  The keydown event object
 */
aria.Listbox.prototype.checkKeyPress = function (evt) {
  var key = evt.which || evt.keyCode;
  var lastActiveId = this.activeDescendant;
  var allOptions = this.listboxNode.querySelectorAll('[role="option"]');
  var currentItem =
    document.getElementById(this.activeDescendant) || allOptions[0];
  var nextItem = currentItem;

  if (!currentItem) {
    return;
  }

  switch (key) {
    case aria.KeyCode.PAGE_UP:
    case aria.KeyCode.PAGE_DOWN:
      if (this.moveUpDownEnabled) {
        evt.preventDefault();

        if (key === aria.KeyCode.PAGE_UP) {
          this.moveUpItems();
        } else {
          this.moveDownItems();
        }
      }

      break;
    case aria.KeyCode.UP:
    case aria.KeyCode.DOWN:
      if (!this.activeDescendant) {
        // focus first option if no option was previously focused, and perform no other actions
        this.focusItem(currentItem);
        break;
      }

      if (this.moveUpDownEnabled && evt.altKey) {
        evt.preventDefault();
        if (key === aria.KeyCode.UP) {
          this.moveUpItems();
        } else {
          this.moveDownItems();
        }
        return;
      }

      if (key === aria.KeyCode.UP) {
        nextItem = this.findPreviousOption(currentItem);
      } else {
        nextItem = this.findNextOption(currentItem);
      }

      if (nextItem && this.multiselectable && event.shiftKey) {
        this.selectRange(this.startRangeIndex, nextItem);
      }

      if (nextItem) {
        this.focusItem(nextItem);
        evt.preventDefault();
      }

      break;
    case aria.KeyCode.HOME:
      evt.preventDefault();
      this.focusFirstItem();

      if (this.multiselectable && evt.shiftKey && evt.ctrlKey) {
        this.selectRange(this.startRangeIndex, 0);
      }
      break;
    case aria.KeyCode.END:
      evt.preventDefault();
      this.focusLastItem();

      if (this.multiselectable && evt.shiftKey && evt.ctrlKey) {
        this.selectRange(this.startRangeIndex, allOptions.length - 1);
      }
      break;
    case aria.KeyCode.SHIFT:
      this.startRangeIndex = this.getElementIndex(currentItem, allOptions);
      break;
    case aria.KeyCode.SPACE:
      evt.preventDefault();
      this.toggleSelectItem(nextItem);
      break;
    case aria.KeyCode.BACKSPACE:
    case aria.KeyCode.DELETE:
    case aria.KeyCode.RETURN:
      if (!this.moveButton) {
        return;
      }

      var keyshortcuts = this.moveButton.getAttribute('aria-keyshortcuts');
      if (key === aria.KeyCode.RETURN && keyshortcuts.indexOf('Enter') === -1) {
        return;
      }
      if (
        (key === aria.KeyCode.BACKSPACE || key === aria.KeyCode.DELETE) &&
        keyshortcuts.indexOf('Delete') === -1
      ) {
        return;
      }

      evt.preventDefault();

      var nextUnselected = nextItem.nextElementSibling;
      while (nextUnselected) {
        if (nextUnselected.getAttribute('aria-selected') != 'true') {
          break;
        }
        nextUnselected = nextUnselected.nextElementSibling;
      }
      if (!nextUnselected) {
        nextUnselected = nextItem.previousElementSibling;
        while (nextUnselected) {
          if (nextUnselected.getAttribute('aria-selected') != 'true') {
            break;
          }
          nextUnselected = nextUnselected.previousElementSibling;
        }
      }

      this.moveItems();

      if (!this.activeDescendant && nextUnselected) {
        this.focusItem(nextUnselected);
      }
      break;
    case 65:
      // handle control + A
      if (this.multiselectable && (evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
        this.selectRange(0, allOptions.length - 1);
        break;
      }
    // fall through
    default:
      var itemToFocus = this.findItemToFocus(key);
      if (itemToFocus) {
        this.focusItem(itemToFocus);
      }
      break;
  }

  if (this.activeDescendant !== lastActiveId) {
    this.updateScroll();
  }
};

aria.Listbox.prototype.findItemToFocus = function (key) {
  var itemList = this.listboxNode.querySelectorAll('[role="option"]');
  var character = String.fromCharCode(key);
  var searchIndex = 0;

  if (!this.keysSoFar) {
    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].getAttribute('id') == this.activeDescendant) {
        searchIndex = i;
      }
    }
  }
  this.keysSoFar += character;
  this.clearKeysSoFarAfterDelay();

  var nextMatch = this.findMatchInRange(
    itemList,
    searchIndex + 1,
    itemList.length
  );
  if (!nextMatch) {
    nextMatch = this.findMatchInRange(itemList, 0, searchIndex);
  }
  return nextMatch;
};

/* Return the index of the passed element within the passed array, or null if not found */
aria.Listbox.prototype.getElementIndex = function (option, options) {
  var allOptions = Array.prototype.slice.call(options); // convert to array
  var optionIndex = allOptions.indexOf(option);

  return typeof optionIndex === 'number' ? optionIndex : null;
};

/* Return the next listbox option, if it exists; otherwise, returns null */
aria.Listbox.prototype.findNextOption = function (currentOption) {
  var allOptions = Array.prototype.slice.call(
    this.listboxNode.querySelectorAll('[role="option"]')
  ); // get options array
  var currentOptionIndex = allOptions.indexOf(currentOption);
  var nextOption = null;

  if (currentOptionIndex > -1 && currentOptionIndex < allOptions.length - 1) {
    nextOption = allOptions[currentOptionIndex + 1];
  }

  return nextOption;
};

/* Return the previous listbox option, if it exists; otherwise, returns null */
aria.Listbox.prototype.findPreviousOption = function (currentOption) {
  var allOptions = Array.prototype.slice.call(
    this.listboxNode.querySelectorAll('[role="option"]')
  ); // get options array
  var currentOptionIndex = allOptions.indexOf(currentOption);
  var previousOption = null;

  if (currentOptionIndex > -1 && currentOptionIndex > 0) {
    previousOption = allOptions[currentOptionIndex - 1];
  }

  return previousOption;
};

aria.Listbox.prototype.clearKeysSoFarAfterDelay = function () {
  if (this.keyClear) {
    clearTimeout(this.keyClear);
    this.keyClear = null;
  }
  this.keyClear = setTimeout(
    function () {
      this.keysSoFar = '';
      this.keyClear = null;
    }.bind(this),
    500
  );
};

aria.Listbox.prototype.findMatchInRange = function (
  list,
  startIndex,
  endIndex
) {
  // Find the first item starting with the keysSoFar substring, searching in
  // the specified range of items
  for (var n = startIndex; n < endIndex; n++) {
    var label = list[n].innerText;
    if (label && label.toUpperCase().indexOf(this.keysSoFar) === 0) {
      return list[n];
    }
  }
  return null;
};

/**
 * @description
 *  Check if an item is clicked on. If so, focus on it and select it.
 * @param evt
 *  The click event object
 */
aria.Listbox.prototype.checkClickItem = function (evt) {
  if (evt.target.getAttribute('role') !== 'option') {
    return;
  }

  this.focusItem(evt.target);
  this.toggleSelectItem(evt.target);
  this.updateScroll();

  if (this.multiselectable && evt.shiftKey) {
    this.selectRange(this.startRangeIndex, evt.target);
  }
};

/**
 * Prevent text selection on shift + click for multi-select listboxes
 *
 * @param evt
 */
aria.Listbox.prototype.checkMouseDown = function (evt) {
  if (
    this.multiselectable &&
    evt.shiftKey &&
    evt.target.getAttribute('role') === 'option'
  ) {
    evt.preventDefault();
  }
};

/**
 * @description
 *  Toggle the aria-selected value
 * @param element
 *  The element to select
 */
aria.Listbox.prototype.toggleSelectItem = function (element) {
  if (this.multiselectable) {
    element.setAttribute(
      'aria-selected',
      element.getAttribute('aria-selected') === 'true' ? 'false' : 'true'
    );

    this.updateMoveButton();
  }
};

/**
 * @description
 *  Defocus the specified item
 * @param element
 *  The element to defocus
 */
aria.Listbox.prototype.defocusItem = function (element) {
  if (!element) {
    return;
  }
  if (!this.multiselectable) {
    element.removeAttribute('aria-selected');
  }
  element.classList.remove('focused');
};

/**
 * @description
 *  Focus on the specified item
 * @param element
 *  The element to focus
 */
aria.Listbox.prototype.focusItem = function (element) {
  this.defocusItem(document.getElementById(this.activeDescendant));
  if (!this.multiselectable) {
    element.setAttribute('aria-selected', 'true');
  }
  element.classList.add('focused');
  this.listboxNode.setAttribute('aria-activedescendant', element.id);
  this.activeDescendant = element.id;

  if (!this.multiselectable) {
    this.updateMoveButton();
  }

  this.checkUpDownButtons();
  this.handleFocusChange(element);
};

/**
 * Helper function to check if a number is within a range; no side effects.
 *
 * @param index
 * @param start
 * @param end
 * @returns {boolean}
 */
aria.Listbox.prototype.checkInRange = function (index, start, end) {
  var rangeStart = start < end ? start : end;
  var rangeEnd = start < end ? end : start;

  return index >= rangeStart && index <= rangeEnd;
};

/**
 * Select a range of options
 *
 * @param start
 * @param end
 */
aria.Listbox.prototype.selectRange = function (start, end) {
  // get start/end indices
  var allOptions = this.listboxNode.querySelectorAll('[role="option"]');
  var startIndex =
    typeof start === 'number' ? start : this.getElementIndex(start, allOptions);
  var endIndex =
    typeof end === 'number' ? end : this.getElementIndex(end, allOptions);

  for (var index = 0; index < allOptions.length; index++) {
    var selected = this.checkInRange(index, startIndex, endIndex);
    allOptions[index].setAttribute('aria-selected', selected + '');
  }

  this.updateMoveButton();
};

/**
 * Check for selected options and update moveButton, if applicable
 */
aria.Listbox.prototype.updateMoveButton = function () {
  if (!this.moveButton) {
    return;
  }

  if (this.listboxNode.querySelector('[aria-selected="true"]')) {
    this.moveButton.setAttribute('aria-disabled', 'false');
  } else {
    this.moveButton.setAttribute('aria-disabled', 'true');
  }
};

/**
 * Check if the selected option is in view, and scroll if not
 */
aria.Listbox.prototype.updateScroll = function () {
  var selectedOption = document.getElementById(this.activeDescendant);
  if (
    selectedOption &&
    this.listboxNode.scrollHeight > this.listboxNode.clientHeight
  ) {
    var scrollBottom =
      this.listboxNode.clientHeight + this.listboxNode.scrollTop;
    var elementBottom = selectedOption.offsetTop + selectedOption.offsetHeight;
    if (elementBottom > scrollBottom) {
      this.listboxNode.scrollTop =
        elementBottom - this.listboxNode.clientHeight;
    } else if (selectedOption.offsetTop < this.listboxNode.scrollTop) {
      this.listboxNode.scrollTop = selectedOption.offsetTop;
    }
  }
};

/**
 * @description
 *  Enable/disable the up/down arrows based on the activeDescendant.
 */
aria.Listbox.prototype.checkUpDownButtons = function () {
  var activeElement = document.getElementById(this.activeDescendant);

  if (!this.moveUpDownEnabled) {
    return;
  }

  if (!activeElement) {
    this.upButton.setAttribute('aria-disabled', 'true');
    this.downButton.setAttribute('aria-disabled', 'true');
    return;
  }

  if (this.upButton) {
    if (activeElement.previousElementSibling) {
      this.upButton.setAttribute('aria-disabled', false);
    } else {
      this.upButton.setAttribute('aria-disabled', 'true');
    }
  }

  if (this.downButton) {
    if (activeElement.nextElementSibling) {
      this.downButton.setAttribute('aria-disabled', false);
    } else {
      this.downButton.setAttribute('aria-disabled', 'true');
    }
  }
};

/**
 * @description
 *  Add the specified items to the listbox. Assumes items are valid options.
 * @param items
 *  An array of items to add to the listbox
 */
aria.Listbox.prototype.addItems = function (items) {
  if (!items || !items.length) {
    return;
  }

  items.forEach(
    function (item) {
      this.defocusItem(item);
      this.toggleSelectItem(item);
      this.listboxNode.append(item);
    }.bind(this)
  );

  if (!this.activeDescendant) {
    this.focusItem(items[0]);
  }

  this.handleItemChange('added', items);
};

/**
 * @description
 *  Remove all of the selected items from the listbox; Removes the focused items
 *  in a single select listbox and the items with aria-selected in a multi
 *  select listbox.
 * @returns {Array}
 *  An array of items that were removed from the listbox
 */
aria.Listbox.prototype.deleteItems = function () {
  var itemsToDelete;

  if (this.multiselectable) {
    itemsToDelete = this.listboxNode.querySelectorAll('[aria-selected="true"]');
  } else if (this.activeDescendant) {
    itemsToDelete = [document.getElementById(this.activeDescendant)];
  }

  if (!itemsToDelete || !itemsToDelete.length) {
    return [];
  }

  itemsToDelete.forEach(
    function (item) {
      item.remove();

      if (item.id === this.activeDescendant) {
        this.clearActiveDescendant();
      }
    }.bind(this)
  );

  this.handleItemChange('removed', itemsToDelete);

  return itemsToDelete;
};

aria.Listbox.prototype.clearActiveDescendant = function () {
  this.activeDescendant = null;
  this.listboxNode.setAttribute('aria-activedescendant', null);

  this.updateMoveButton();
  this.checkUpDownButtons();
};

/**
 * @description
 *  Shifts the currently focused item up on the list. No shifting occurs if the
 *  item is already at the top of the list.
 */
aria.Listbox.prototype.moveUpItems = function () {
  if (!this.activeDescendant) {
    return;
  }

  var currentItem = document.getElementById(this.activeDescendant);
  var previousItem = currentItem.previousElementSibling;

  if (previousItem) {
    this.listboxNode.insertBefore(currentItem, previousItem);
    this.handleItemChange('moved_up', [currentItem]);
  }

  this.checkUpDownButtons();
};

/**
 * @description
 *  Shifts the currently focused item down on the list. No shifting occurs if
 *  the item is already at the end of the list.
 */
aria.Listbox.prototype.moveDownItems = function () {
  if (!this.activeDescendant) {
    return;
  }

  var currentItem = document.getElementById(this.activeDescendant);
  var nextItem = currentItem.nextElementSibling;

  if (nextItem) {
    this.listboxNode.insertBefore(nextItem, currentItem);
    this.handleItemChange('moved_down', [currentItem]);
  }

  this.checkUpDownButtons();
};

/**
 * @description
 *  Delete the currently selected items and add them to the sibling list.
 */
aria.Listbox.prototype.moveItems = function () {
  if (!this.siblingList) {
    return;
  }

  var itemsToMove = this.deleteItems();
  this.siblingList.addItems(itemsToMove);
};

/**
 * @description
 *  Enable Up/Down controls to shift items up and down.
 * @param upButton
 *   Up button to trigger up shift
 * @param downButton
 *   Down button to trigger down shift
 */
aria.Listbox.prototype.enableMoveUpDown = function (upButton, downButton) {
  this.moveUpDownEnabled = true;
  this.upButton = upButton;
  this.downButton = downButton;
  upButton.addEventListener('click', this.moveUpItems.bind(this));
  downButton.addEventListener('click', this.moveDownItems.bind(this));
};

/**
 * @description
 *  Enable Move controls. Moving removes selected items from the current
 *  list and adds them to the sibling list.
 * @param button
 *   Move button to trigger delete
 * @param siblingList
 *   Listbox to move items to
 */
aria.Listbox.prototype.setupMove = function (button, siblingList) {
  this.siblingList = siblingList;
  this.moveButton = button;
  button.addEventListener('click', this.moveItems.bind(this));
};

aria.Listbox.prototype.setHandleItemChange = function (handlerFn) {
  this.handleItemChange = handlerFn;
};

aria.Listbox.prototype.setHandleFocusChange = function (focusChangeHandler) {
  this.handleFocusChange = focusChangeHandler;
};
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

'use strict';

/**
 * @namespace aria
 */
var aria = aria || {};

/**
 * @class
 * @description
 *  Toolbar object representing the state and interactions for a toolbar widget
 * @param toolbarNode
 *  The DOM node pointing to the toolbar
 */
aria.Toolbar = function (toolbarNode) {
  this.toolbarNode = toolbarNode;
  this.items = this.toolbarNode.querySelectorAll('.toolbar-item');
  this.selectedItem = this.toolbarNode.querySelector('.selected');
  this.registerEvents();
};

/**
 * @description
 *  Register events for the toolbar interactions
 */
aria.Toolbar.prototype.registerEvents = function () {
  this.toolbarNode.addEventListener(
    'keydown',
    this.checkFocusChange.bind(this)
  );
  this.toolbarNode.addEventListener('click', this.checkClickItem.bind(this));
};

/**
 * @description
 *  Handle various keyboard controls; LEFT/RIGHT will shift focus; DOWN
 *  activates a menu button if it is the focused item.
 * @param evt
 *  The keydown event object
 */
aria.Toolbar.prototype.checkFocusChange = function (evt) {
  var key = evt.which || evt.keyCode;
  var nextIndex, nextItem;

  switch (key) {
    case aria.KeyCode.LEFT:
    case aria.KeyCode.RIGHT:
      nextIndex = Array.prototype.indexOf.call(this.items, this.selectedItem);
      nextIndex = key === aria.KeyCode.LEFT ? nextIndex - 1 : nextIndex + 1;
      nextIndex = Math.max(Math.min(nextIndex, this.items.length - 1), 0);

      nextItem = this.items[nextIndex];
      this.selectItem(nextItem);
      this.focusItem(nextItem);
      break;
    case aria.KeyCode.DOWN:
      // if selected item is menu button, pressing DOWN should act like a click
      if (aria.Utils.hasClass(this.selectedItem, 'menu-button')) {
        evt.preventDefault();
        this.selectedItem.click();
      }
      break;
  }
};

/**
 * @description
 *  Selects a toolbar item if it is clicked
 * @param evt
 *  The click event object
 */
aria.Toolbar.prototype.checkClickItem = function (evt) {
  if (aria.Utils.hasClass(evt.target, 'toolbar-item')) {
    this.selectItem(evt.target);
  }
};

/**
 * @description
 *  Deselect the specified item
 * @param element
 *  The item to deselect
 */
aria.Toolbar.prototype.deselectItem = function (element) {
  aria.Utils.removeClass(element, 'selected');
  element.setAttribute('aria-selected', 'false');
  element.setAttribute('tabindex', '-1');
};

/**
 * @description
 *  Deselect the currently selected item and select the specified item
 * @param element
 *  The item to select
 */
aria.Toolbar.prototype.selectItem = function (element) {
  this.deselectItem(this.selectedItem);
  aria.Utils.addClass(element, 'selected');
  element.setAttribute('aria-selected', 'true');
  element.setAttribute('tabindex', '0');
  this.selectedItem = element;
};

/**
 * @description
 *  Focus on the specified item
 * @param element
 *  The item to focus on
 */
aria.Toolbar.prototype.focusItem = function (element) {
  element.focus();
};
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

/* global aria */

'use strict';

/**
 * ARIA Listbox Examples
 *
 * @function onload
 * @description Initialize the listbox examples once the page has loaded
 */

window.addEventListener('load', function () {
  // This onload handle initializes two examples. Only initialize example if the example
  // can be found in the dom.
  if (document.getElementById('ss_imp_list')) {
    var ex1ImportantListbox = new aria.Listbox(
      document.getElementById('ss_imp_list')
    );
    var ex1UnimportantListbox = new aria.Listbox(
      document.getElementById('ss_unimp_list')
    );
    new aria.Toolbar(document.querySelector('[role="toolbar"]'));

    ex1ImportantListbox.enableMoveUpDown(
      document.getElementById('ex1-up'),
      document.getElementById('ex1-down')
    );
    ex1ImportantListbox.setupMove(
      document.getElementById('ex1-delete'),
      ex1UnimportantListbox
    );
    ex1ImportantListbox.setHandleItemChange(function (event, items) {
      var updateText = '';

      switch (event) {
        case 'added':
          updateText =
            'Moved ' + items[0].innerText + ' to important features.';
          break;
        case 'removed':
          updateText =
            'Moved ' + items[0].innerText + ' to unimportant features.';
          break;
        case 'moved_up':
        case 'moved_down':
          var pos = Array.prototype.indexOf.call(
            this.listboxNode.children,
            items[0]
          );
          pos++;
          updateText = 'Moved to position ' + pos;
          break;
      }

      if (updateText) {
        var ex1LiveRegion = document.getElementById('ss_live_region');
        ex1LiveRegion.innerText = updateText;
      }
    });
    ex1UnimportantListbox.setupMove(
      document.getElementById('ex1-add'),
      ex1ImportantListbox
    );
  }

  // This onload handle initializes two examples. Only initialize example if the example
  // can be found in the dom.
  if (document.getElementById('ms_imp_list')) {
    var ex2ImportantListbox = new aria.Listbox(
      document.getElementById('ms_imp_list')
    );
    var ex2UnimportantListbox = new aria.Listbox(
      document.getElementById('ms_unimp_list')
    );

    ex2ImportantListbox.setupMove(
      document.getElementById('ex2-add'),
      ex2UnimportantListbox
    );
    ex2UnimportantListbox.setupMove(
      document.getElementById('ex2-delete'),
      ex2ImportantListbox
    );
    ex2UnimportantListbox.setHandleItemChange(function (event, items) {
      var updateText = '';
      var itemText = items.length === 1 ? '1 item' : items.length + ' items';

      switch (event) {
        case 'added':
          updateText = 'Added ' + itemText + ' to chosen features.';
          break;
        case 'removed':
          updateText = 'Removed ' + itemText + ' from chosen features.';
          break;
      }

      if (updateText) {
        var ex1LiveRegion = document.getElementById('ms_live_region');
        ex1LiveRegion.innerText = updateText;
      }
    });
  }
});
'use strict';
/**
 * @namespace aria
 */

var aria = aria || {};

/**
 * @description
 *  Key code constants
 */
aria.KeyCode = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  SHIFT: 16,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
};

aria.Utils = aria.Utils || {};

// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria.Utils.matches = function (element, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = element.parentNode.querySelectorAll(s);
        var i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
          // empty
        }
        return i > -1;
      };
  }

  return element.matches(selector);
};

aria.Utils.remove = function (item) {
  if (item.remove && typeof item.remove === 'function') {
    return item.remove();
  }
  if (
    item.parentNode &&
    item.parentNode.removeChild &&
    typeof item.parentNode.removeChild === 'function'
  ) {
    return item.parentNode.removeChild(item);
  }
  return false;
};

aria.Utils.isFocusable = function (element) {
  if (element.tabIndex < 0) {
    return false;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';
    case 'INPUT':
      return element.type != 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

aria.Utils.getAncestorBySelector = function (element, selector) {
  if (!aria.Utils.matches(element, selector + ' ' + element.tagName)) {
    // Element is not inside an element that matches selector
    return null;
  }

  // Move up the DOM tree until a parent matching the selector is found
  var currentNode = element;
  var ancestor = null;
  while (ancestor === null) {
    if (aria.Utils.matches(currentNode.parentNode, selector)) {
      ancestor = currentNode.parentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return ancestor;
};

aria.Utils.hasClass = function (element, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
};

aria.Utils.addClass = function (element, className) {
  if (!aria.Utils.hasClass(element, className)) {
    element.className += ' ' + className;
  }
};

aria.Utils.removeClass = function (element, className) {
  var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
  element.className = element.className.replace(classRegex, ' ').trim();
};

aria.Utils.bindMethods = function (object /* , ...methodNames */) {
  var methodNames = Array.prototype.slice.call(arguments, 1);
  methodNames.forEach(function (method) {
    object[method] = object[method].bind(object);
  });
};
