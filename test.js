const d = new Date("2024-03-15T10:30:00Z");
const year = d.getFullYear();
const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 because Jan is 0
const day = String(d.getDate()).padStart(2, '0');

const formatted = `${month}-${day}-${year}`; // "09-03-2026"

// console.log(formatted)
// shot cut


const formatted2 = new Date("2024-03-15T10:30:00Z")
  .toLocaleDateString("en-US")
  .replaceAll("/", "-");

  // console.log(formatted2)

  /*
========================================
ISSUE TRACKER APP
========================================

MAIN FEATURES
1. Load Issues from API
2. Filter Issues (Open / Closed)
3. Search Issues
4. Show Issue Details Modal
5. Dynamic Labels
6. Loading Spinner
7. Digital Clock

DATA FLOW

Page Load
   ↓
loadIssues()
   ↓
Fetch API
   ↓
Store Data → alldatas
   ↓
Render Cards → showAllIssuCard()

USER ACTIONS

Filter Button → showfilterIssues()
Search → loadSearchIssues()
Card Click → showModal()

========================================
*/

// User Action
//    │
//    ├── Filter Button
//    │       │
//    │       ▼
//    │   showfilterIssues()
//    │       │
//    │       ▼
//    │   filter(alldatas)
//    │       │
//    │       ▼
//    │   showAllIssuCard()
//    │
//    │
//    ├── Search Input
//    │       │
//    │       ▼
//    │   loadSearchIssues()
//    │       │
//    │       ▼
//    │   Fetch Search API
//    │       │
//    │       ▼
//    │   showAllIssuCard()
//    │
//    │
//    └── Click Issue Card
//            │
//            ▼
//        showModal(id)
//            │
//            ▼
//        Fetch Single Issue
//            │
//            ▼
//        showModalCard()
//            │
//            ▼
//         Open Modal
// Core Function Responsibility
// | Function             | কাজ                        |
// | -------------------- | -------------------------- |
// | `loadIssues()`       | API থেকে সব issue load করে |
// | `showAllIssuCard()`  | issue card render করে      |
// | `showfilterIssues()` | open/closed filter করে     |
// | `loadSearchIssues()` | search API call করে        |
// | `showModal()`        | single issue fetch করে     |
// | `showModalCard()`    | modal content render করে   |
// | `showIssuesLabels()` | label UI generate করে      |
// | `spinnerTime()`      | loading spinner control    |
// | `activeBtn()`        | button active style        |
// | `showTime()`         | digital clock              |
