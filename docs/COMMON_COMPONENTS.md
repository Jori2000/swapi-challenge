# Common Components Documentation

## Overview

Reusable UI components for common patterns in the SWAPI Challenge application.

## Components

### Loading Component

Loading indicator for async operations.

**Location**: `src/components/common/Loading.tsx`

**Props**:
```typescript
interface LoadingProps {
  text?: string;  // Optional loading message (default: "Loading...")
}
```

**Features**:
- Simple hourglass emoji (⏳) with rotating animation
- Customizable loading message
- Minimal styling, functional focus
- Centered layout with flex

**Examples**:

```typescript
import { Loading } from '../components';

// Default: "Loading..."
<Loading />

// Custom message
<Loading text="Fetching characters..." />
```

**Real-world usage with React Query**:
```typescript
const { data, isLoading } = usePerson(personId);

if (isLoading) {
  return <Loading text="Loading character..." />;
}

// Display data...
```

---

### ErrorMessage Component

Error display with optional retry button.

**Location**: `src/components/common/ErrorMessage.tsx`

**Props**:
```typescript
interface ErrorMessageProps {
  message: string;     // Error message to display (required)
  retry?: () => void;  // Optional retry callback function
}
```

**Features**:
- Error emoji (❌) indicator
- User-friendly error message display
- Optional "Try Again" button when retry function provided
- Button hover effects for better UX
- Centered layout with flex

**Examples**:

```typescript
import { ErrorMessage } from '../components';

// Error without retry
<ErrorMessage message="Something went wrong" />

// Error with retry button
<ErrorMessage
  message="Failed to load characters"
  retry={() => refetch()}
/>
```

**Real-world usage with React Query**:
```typescript
const { data, error, refetch } = usePerson(personId);

if (error) {
  const message = handleApiError(error);
  return (
    <ErrorMessage
      message={`Failed: ${message}`}
      retry={() => refetch()}
    />
  );
}

// Display data...
```

---

## Common Patterns

### 1. Loading State in Component

```typescript
import { Loading } from '../components';
import { usePerson } from '../hooks';

export const CharacterCard: React.FC<{ id: number }> = ({ id }) => {
  const { data: person, isLoading } = usePerson(id);

  if (isLoading) {
    return <Loading text="Loading character..." />;
  }

  return <div>{person?.name}</div>;
};
```

### 2. Error Handling with Retry

```typescript
import { ErrorMessage } from '../components';
import { usePerson } from '../hooks';
import { handleApiError } from '../api';

export const CharacterDetail: React.FC<{ id: number }> = ({ id }) => {
  const { data: person, error, refetch } = usePerson(id);

  if (error) {
    return (
      <ErrorMessage
        message={handleApiError(error)}
        retry={() => refetch()}
      />
    );
  }

  return <div>{person?.name}</div>;
};
```

### 3. Complete Data Fetching Pattern

```typescript
import { Loading, ErrorMessage } from '../components';
import { usePerson } from '../hooks';
import { handleApiError } from '../api';

export const CharacterProfile: React.FC<{ id: number }> = ({ id }) => {
  const { data: person, isLoading, error, refetch } = usePerson(id);

  // Loading state
  if (isLoading) {
    return <Loading text="Loading character profile..." />;
  }

  // Error state with retry
  if (error) {
    return (
      <ErrorMessage
        message={handleApiError(error)}
        retry={() => refetch()}
      />
    );
  }

  // Not found state
  if (!person) {
    return <ErrorMessage message="Character not found" />;
  }

  // Success state
  return (
    <div>
      <h1>{person.name}</h1>
      <p>Height: {person.height}cm</p>
      <p>Mass: {person.mass}kg</p>
    </div>
  );
};
```

### 4. Generic Data Fetching Component

For reusable patterns across components:

```typescript
interface DataDisplayProps<T> {
  isLoading: boolean;
  error: unknown;
  data: T | undefined;
  onRetry: () => void;
  children: (data: T) => React.ReactNode;
  loadingText?: string;
}

export const DataDisplay = <T,>({
  isLoading,
  error,
  data,
  onRetry,
  children,
  loadingText = 'Loading...',
}: DataDisplayProps<T>) => {
  if (isLoading) {
    return <Loading text={loadingText} />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={handleApiError(error)}
        retry={onRetry}
      />
    );
  }

  if (!data) {
    return <ErrorMessage message="No data found" />;
  }

  return <>{children(data)}</>;
};

// Usage:
<DataDisplay
  isLoading={isLoading}
  error={error}
  data={person}
  onRetry={() => refetch()}
  loadingText="Loading character..."
>
  {(person) => <h1>{person.name}</h1>}
</DataDisplay>
```

---

## Styling Notes

- **Minimal CSS**: Only inline styles for layout and animations
- **Functional first**: Components focus on behavior, not appearance
- **Emoji indicators**: Used for visual clarity without custom icons
- **Flex layout**: Centered display with `display: flex`
- **Color scheme**:
  - Loading: Gray (`#666`)
  - Error: Red (`#d32f2f`)
  - Button: Blue (`#1976d2`)

---

## Integration with API Error Handling

Always use `handleApiError()` to convert Axios errors to user-friendly messages:

```typescript
import { handleApiError } from '../api';

try {
  const person = await getPerson(id);
} catch (error) {
  const message = handleApiError(error);
  // "No response from server..."
  // "Request timeout..."
  // "API Error: 404"
  return <ErrorMessage message={message} />;
}
```

---

## Future Enhancements

- Customizable emoji/icons
- Custom color themes
- Toast notifications for errors
- Skeleton loading states
- Error boundary integration
