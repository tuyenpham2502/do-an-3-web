# SP Admin Dashboard

A modern admin dashboard built with React, TypeScript, and Ant Design.

## 🚀 Features

- Modern React with TypeScript
- Ant Design Components
- Clean Architecture Pattern
- Multi-language Support (i18n)
- Theme Switching (Light/Dark)
- Authentication & Authorization
- Responsive Design

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- Ant Design
- Tailwind CSS
- Jotai (State Management)
- React Router v7
- i18next
- React Query

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sp-admin
```

2. Install dependencies
```bash
yarn install
```

3. Create environment file
```bash
cp .env.example .env.development
```

4. Start development server
```bash
yarn dev
```

## 🏗 Project Structure

```
src/
├── application/         # Business logic layer
│   ├── dto/            # Data Transfer Objects
│   ├── repositories/   # Repository interfaces
│   ├── services/       # Business services
│   └── stores/         # State management (Jotai atoms)
│
├── domain/             # Domain layer
│   └── models/         # Core business models
│
├── infrastructure/     # Infrastructure layer
│   ├── http/          # API client configuration
│   ├── repositories/   # Repository implementations
│   ├── services/      # Service implementations
│   └── hooks/         # Infrastructure hooks
│
├── presentation/       # UI layer
│   ├── components/    # Shared UI components
│   ├── layouts/       # Layout components
│   ├── pages/         # Page components
│   ├── providers/     # Context providers
│   ├── routes/        # Route configurations
│   └── hooks/         # Presentation hooks
│
└── shared/            # Shared utilities
    ├── constants/     # Constants and enums
    └── utils/         # Utility functions
```

## 🎣 Hook Organization

Hooks are organized based on their responsibilities and the layer they belong to:

1. **Infrastructure Hooks** (`/infrastructure/hooks/`)
   - API related hooks (`useApi`, `useAxios`)
   - Storage hooks (`useLocalStorage`)
   - Service hooks (`useAuthService`)

2. **Presentation Hooks** (`/presentation/hooks/`)
   - UI state hooks (`useModal`, `useForm`)
   - Layout hooks (`useSidebar`, `useHeader`)
   - Feature-specific hooks inside feature folders:
     ```
     /presentation/features/auth/hooks/useLogin.ts
     /presentation/features/users/hooks/useUsers.ts
     ```

This organization prevents hook duplication and maintains clear separation of concerns.

## 🔧 Development

### Code Style
- Follow the TypeScript coding guidelines
- Use ESLint and Prettier for code formatting
- Follow Ant Design patterns for component development

### Branch Strategy
- `main`: Production branch
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Commit Convention
Follow conventional commits:
```
feat: add new feature
fix: bug fix
docs: update documentation
style: formatting, missing semi colons, etc
refactor: code refactoring
test: add tests
chore: updating build tasks, package manager configs, etc.
```

## 🚀 Deployment

1. Build the application
```bash
yarn build
```

2. Preview the build
```bash
yarn preview
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.