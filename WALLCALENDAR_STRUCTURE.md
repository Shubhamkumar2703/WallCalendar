# WallCalendar - Modular Structure

## Overview
The WallCalendar component has been successfully refactored from a single monolithic file into a well-organized, modular folder structure.

## New Folder Structure

```
app/components/
├── WallCalendar.tsx (re-export file)
└── WallCalendar/ (main component folder)
    ├── index.tsx (main component)
    ├── constants/
    │   ├── index.ts
    │   ├── days.ts (array of day names)
    │   ├── months.ts (array of month names)
    │   ├── themes.ts (month themes with colors, emojis, accents)
    │   └── holidays.ts (holiday definitions)
    ├── utils/
    │   ├── index.ts
    │   ├── dateUtils.ts (date manipulation functions)
    │   └── styles.ts (base CSS styles and animations)
    ├── subcomponents/
    │   ├── index.ts
    │   ├── HeroPanel.tsx (left sidebar with month/theme display)
    │   ├── CalendarGrid.tsx (main calendar grid with day cells)
    │   └── NotesSection.tsx (notes input and display)
    └── hooks/
        ├── index.ts
        └── useCalendarLogic.ts (all calendar state and logic)
```

## Benefits of This Structure

1. **Separation of Concerns**: Each folder handles a specific aspect
   - `constants/` - All configuration data
   - `utils/` - Reusable helper functions and styles
   - `subcomponents/` - UI components
   - `hooks/` - Business logic

2. **Maintainability**: Easier to find and modify specific features
3. **Reusability**: Components can be used independently
4. **Scalability**: Easy to add new utilities, constants, or components
5. **Testing**: Each module can be tested independently

## File Descriptions

### Constants
- **days.ts**: Days of the week array
- **months.ts**: Month names array
- **themes.ts**: MonthTheme interface and color schemes for each month
- **holidays.ts**: Holiday dates and names

### Utils
- **dateUtils.ts**: 
  - `getDaysInMonth()` - Get number of days in a month
  - `getFirstDayOfMonth()` - Get starting day of month
  - `isSameDay()` - Compare two dates
  - `isBetween()` - Check if date is in range
  - `formatDate()` - Format date to readable string

- **styles.ts**: Base CSS styles with animations (slideLeft, slideRight, fadeUp)

### Subcomponents
- **HeroPanel.tsx**: Displays month, year, theme emoji, and navigation
- **CalendarGrid.tsx**: Renders calendar grid with day cells and holiday indicators
- **NotesSection.tsx**: Text area for month/range notes with save functionality

### Hooks
- **useCalendarLogic.ts**: Manages all state and logic for the calendar
  - Date navigation
  - Date range selection
  - Note management
  - Mobile responsiveness

## Import Example

In the main `index.tsx`:
```typescript
import { MONTH_THEMES } from "./constants";
import { baseStyle } from "./utils";
import { HeroPanel, CalendarGrid, NotesSection } from "./subcomponents";
import { useCalendarLogic } from "./hooks";
```

## Backward Compatibility

The original `app/components/WallCalendar.tsx` file now acts as a re-export file:
```typescript
export { default } from "./WallCalendar";
```

This ensures all existing imports continue to work without any changes.
