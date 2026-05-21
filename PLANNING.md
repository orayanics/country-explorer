# Feature Planning Document: Country Explorer

## 1. Feature Overview

### What is this feature?

Country Explorer is a directory of countries that helps users search, browse, and view country details using the REST Countries API.

### User goal

The user should be able to search for countries by name, filter by region, and view details about each country, including its borders.

### Scope

What will you include in this version?

- Fetching and displaying a list of countries
- Search by country name
- Filter by region
- Country detail view with borders
- Handling loading, empty, and error states
- Responsive design for mobile, tablet, and desktop

### Out of scope

What will you not include because of the time box?

- ***

## 2. Requirements Review

### Requirements I understand

- The app should fetch and display a list of countries from the REST Countries API.
- The user should be able to search for countries by name.
- The user should be able to filter countries by region.
- The user should be able to click on a country to view its details, including its borders.
- The app should handle loading, empty, and error states gracefully.
- The app should be responsive and work well on mobile, tablet, and desktop.

### Questions or assumptions

List any assumptions you are making.

- I assume the REST Countries API is has queries, pagination, and HTTP code documentaion.

### Requirements I would clarify or challenge

List any part of the spec that you think should be clarified, changed, or improved.

- Does the API support pagination, and if not, how should we handle large datasets?
- Should the search be case-insensitive and support partial matches?

---

## 3. Technical Plan

### API plan

Which REST Countries API endpoints do you plan to use?

- all countries https://restcountries.com/v3.1/all
- name search https://restcountries.com/v3.1/name/{name}
- country details https://restcountries.com/v3.1/alpha/{code}
- border country details https://restcountries.com/v3.1/alpha/{code}

### Data handling

What fields do you need from the API?

For country list:

- name, flags, population, region, capital, and country code (for borders)

For country details:

- name, flags, population, region, subregion, capital, languages, currencies, borders

### Component plan

- Country list component to display the list of countries
- Country card component to display individual country information in the list
- Search and filter controls component for user input
- Country detail view component to display detailed information about a selected country
- Border country card component to display information about bordering countries in the detail view

### State management plan

- use browser URL query parameters for search and filter state
- use component state for loading, error, and selected country state

---

## 4. UX Plan

### Loading state

What should the user see while data is loading?

- A loading spinner or skeleton UI to indicate that data is being fetched.

### Empty state

- A message indicating that no countries were found matching the search or filter criteria.

### Error state

- An error message indicating that something went wrong and suggesting to try again later.

### Missing data

- If no country is found, show "No countries found".
- If borders are missing, show "No bordering countries".

### Responsive behavior

Country list should adapt to different screen sizes:

- mobile: single column list
- tablet: two column list
- desktop: three column

Country detail view should be responseive and adapt to different screen sizes

---

## 5. Testing Plan

- Countries load successfully
- Search works
- Region filter works
- Search and region filter work together
- Detail view opens
- Border country links work
- Mobile layout is usable
- API error is handled
- Missing capital does not break the UI
- States are shown correctly (loading, empty, error)

---

## 6. Risks and Trade-offs

List any risks, shortcuts, or trade-offs due to the time box.

- I chose client-side filtering, search and pagination, but it may not scale well with larger datasets. I recommend using server-side filtering for larger datasets in the future.
- I did not implement automated tests due to time constraints, but I would add them with more time.
- It would be good to add API retries and better caching for improved performance and reliability (others would be rate-limiting).
- It would be good to improve caching with more time but I Pinia/Colada state management should help with caching the country data in memory during the session.
