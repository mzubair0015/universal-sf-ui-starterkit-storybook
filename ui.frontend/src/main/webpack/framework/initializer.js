/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-this-alias */
/**
 * @author Subash Selvaraj <sselvara@adobe.com>
 * Initializer class
 *
 * Responsible for instantiating and map JS Class on components if [data-component=`component`] is present
 * Takes care of intantiation on DOM mutation
 */
import CONSTANTS from "../site/js/const";

class Initializer {
  constructor() {
    var self = this;
    this.selectors = {
      component: "[data-component]",
      body: "body",
    };

    // initialize the components on DOM ready
    if (document.readyState !== "loading") {
      self.onDocumentReady();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        self.onDocumentReady.bind(this),
        { once: true }
      );
    }
  }

  initMutation() {
    /*------------------------------------------------------------------
     * MutationObserver is used to listen for DOM changes
     * DOC: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#Instance_methods
     * Performance related article :
     * https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance
     *------------------------------------------------------------------
     */

    // observe body element for mutations change
    var targetNode = document.querySelector(this.selectors.body);

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    if (targetNode) {
      const observer = new MutationObserver(this.handleMutation.bind(this));
      // Start observing on body element for configured mutations
      observer.observe(targetNode, config);
    }
  }

  // Callback function to execute when mutations are observed
  handleMutation(mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type == "childList") {
        const newNodes = mutation.addedNodes;
        // if new nodes are added to the DOM run through initialize component code
        if (newNodes.length) {
          // console.debug("Initializer: New Nodes -> ", newNodes);
          newNodes.forEach((element) => {
            if (
              element.dataset &&
              element.dataset.component &&
              !element.dataset.initialized
            ) {
              this.initComponent(element);
              element.dataset.initialized = true;
              console.debug(
                "Initializer: Root component is UI component -> ",
                element.dataset.component
              );
            }

            element.querySelector &&
              element.querySelectorAll(this.selectors.component).length &&
              element
                .querySelectorAll(this.selectors.component)
                .forEach((el) => {
                  if (
                    el.dataset &&
                    el.dataset.component &&
                    !el.dataset.initialized
                  ) {
                    this.initComponent(el);
                    el.dataset.initialized = true;
                    console.error(
                      "Initializer: Child component is UI component ->",
                      el.dataset.component
                    );
                  }
                });
          });
        }
      }
    }
  }

  initComponent(el) {
    const dataset = el.dataset;
    const componentName = dataset.component;
    const componentType = dataset.cmpType;
    const isReactComponent =
      CONSTANTS.COMPONENT_TYPE ===
      (componentType && componentType.toLowerCase());
    const pathExtension = isReactComponent
      ? CONSTANTS.REACT_COMPONENTS_PATH
      : ``;

    // const path = `../${pathExtension}components/${componentName}/${componentName}.js`;
    import(
      /* webpackExclude: /\.stories\.js$/ */
      `../${pathExtension}components/${componentName}/${componentName}.js`
    )
      .then((component) => {
        component.default.init(el);
      })
      .catch((error) => {
        console.debug(
          `../${pathExtension}components/${componentName}/${componentName}.js not found`
        );
      });
  }

  onDocumentReady() {
    const elements = document.querySelectorAll(this.selectors.component);
    for (let i = 0; i < elements.length; i++) {
      this.initComponent(elements[i]);
    }
    this.initMutation();
  }
}

export { Initializer };
/* eslint-enable */
