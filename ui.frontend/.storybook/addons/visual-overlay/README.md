# Visual Overlay Addon for Storybook

A Storybook addon that allows you to overlay visual snapshots on top of your components for visual comparison and testing.

## Features

- Overlay visual snapshots on top of your components
- Adjust overlay opacity
- Toggle overlay visibility
- Move overlay position with drag-and-drop
- Keyboard shortcuts for quick control
- Layer toggle functionality
- Responsive controls panel

## Installation

1. Ensure the addon is properly installed in your Storybook configuration
2. The addon should be automatically registered in your Storybook instance

## Usage

### Basic Controls

- **Toggle Overlay**: Click the eye icon in the toolbar to show/hide the overlay
- **Opacity Control**: Use the slider to adjust the overlay's opacity
- **Position Control**: Drag the overlay or use arrow keys to adjust position
- **Layer Toggle**: Use the layer toggle button to switch between overlay and component layers

### Keyboard Shortcuts

- `o` - Toggle overlay visibility
- `+` - Increase opacity
- `-` - Decrease opacity
- `↑/↓/←/→` - Move overlay 1px in respective direction
- `Shift + ↑/↓/←/→` - Move overlay 10px in respective direction
- `r` - Reset overlay position
- `l` - Toggle layer (switch between overlay and component)
- `h` - Toggle handle visibility

### Controls Panel

The controls panel provides easy access to all overlay features:

1. **Opacity Slider**: Adjust the overlay's transparency
2. **Visibility Toggle**: Show/hide the overlay
3. **Drag Handle**: Move the controls panel around
4. **Layer Toggle**: Switch between overlay and component layers

## Configuration

The addon automatically detects and loads visual snapshots based on your story's path. It follows this naming convention:

```
{component}-{story}-{viewport}-chromium-darwin.png
```

Example: `button-primary-default-desktop-chromium-darwin.png`

## Development

### Building the Addon

```bash
cd ui.frontend/.storybook/addons/visual-overlay
npm run build
```

### File Structure

```
visual-overlay/
├── src/
│   └── index.js      # Main addon implementation
├── dist/             # Compiled files
├── package.json      # Addon dependencies
└── README.md         # This documentation
```

## Troubleshooting

1. **Overlay not appearing**
   - Check if the snapshot file exists in the correct location
   - Verify the file naming convention matches your story
   - Ensure the viewport matches your current viewport setting

2. **Controls not responding**
   - Try refreshing the Storybook instance
   - Check the browser console for any errors
   - Ensure you're in the correct view mode (story mode)

3. **Keyboard shortcuts not working**
   - Make sure the story iframe has focus
   - Check if any other addons are conflicting with the shortcuts

## Contributing

Feel free to submit issues and enhancement requests!

## License

This addon is part of the Adobe UI Starter Storybook project. 