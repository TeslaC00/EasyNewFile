# easy-new-file README

## Features

Create new files with templates instantly

Easy New File lets you quickly:

- Choose a file type
- Select a folder location (if no active tab)
- Create a file with name and snippet template without leaving keyboard

File type:

- React Component
- TypeScript Class
- TypeScript Interface
- TypeScript File
- Scratch File

Example (React Component):

```typescript
export default function MyComponent() {
  return <div></div>;
}
```

## Requirements

No external requirements

## Extension Settings

Bind it to your favorite shortcut:

```json
{
  "key": "alt+n",
  "command": "easy-new-file.openMenu"
}
```

## Known Issues

- Does not yet support nested path input (e.g. components/Button/index)
- No multi-root workspace selector (uses primary workspace folder)

## Release Notes

### 0.0.1

Initial release of Easy New File

---

## Contributing

Suggestions and improvements are welcome.

⭐ If You Like It

Consider starring the repository or leaving a review.

**Hope it's unseful to you!**
