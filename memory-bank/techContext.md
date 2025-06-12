# Technical Context

## Core Technologies

### Frontend Framework
- React with TypeScript
- Vite build tool
- Tailwind CSS for styling

### State Management
- Recoil atoms for global state
- React hooks for local state
- Custom hooks for business logic

### Type System
- TypeScript for static typing
- Strict type checking enabled
- Custom type definitions for models

## Development Environment

### Build Tools
- Vite configuration
  - TypeScript support
  - Environment variables
  - Hot Module Replacement

### Code Quality
- Biome for linting and formatting
- TypeScript compiler settings
  - Strict mode enabled
  - Module resolution settings

### Project Configuration
```
Root Config Files:
- tsconfig.json         # TypeScript config
- vite.config.ts       # Build configuration
- biome.json           # Code style rules
- tailwind.config.js   # UI styling config
- components.json      # Component definitions
```

## Dependencies
Key packages and their purposes:

### Core Dependencies
- React + React DOM
- TypeScript
- Tailwind CSS
- i18next for translations

### Development Dependencies
- Vite build tools
- TypeScript compiler
- PostCSS processor
- Biome for code quality

## Integration Patterns

### API Integration
- Axios for HTTP requests
- Repository pattern abstraction
- Error handling middleware
- Response type mapping

### Authentication
- Token-based auth flow
- Local storage persistence
- Protected route guards
- Session management

### Internationalization
- i18next integration
- Language detection
- Translation file structure
- Runtime language switching

## Technical Constraints

### Browser Support
- Modern browsers targeted
- ES6+ features utilized
- CSS Grid/Flexbox usage

### Performance
- Code splitting enabled
- Lazy loading for routes
- Asset optimization

### Security
- Environment variable usage
- Protected route patterns
- Token management
- XSS prevention

## Development Workflow
1. Local development server
2. Environment-specific configs
3. TypeScript compilation
4. CSS processing
5. Hot module replacement

## Deployment Considerations
- Environment variable handling
- Build optimization settings
- Asset management
- Cache control strategies