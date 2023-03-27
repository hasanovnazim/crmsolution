1. **Angular** https://angular.io/guide/styleguide (short overview)

1.1.Single responsibility (https://en.wikipedia.org/wiki/Single-responsibility\_principle ) 1.1.1. Define **one thing**, such as a service or component, per file. One  component per file makes it far easier to read, maintain, and avoid collisions  with teams in source control.

1.2.Small functions

1.2.1. Define small functions. Small functions are easier to test, especially when  they do one thing and serve one purpose.

1.3.Naming conventions

1.3.1. Use consistent names for all symbols. The naming conventions should  simply help find desired code faster and make it easier to understand. 2.3.2. Follow a *‘feature.type.ts’* pattern.

1.4.T-DRY

1.4.1. Try to be DRY (Don't Repeat Yourself).

1.4.2. Avoid being so DRY that you sacrifice readability.

1.5.Components

1.5.1. Component selector as html element (not attribute or class)

1.5.2. Extract templates and styles into a separate file, when more than **10** lines. 1.5.3. Implement lifecycle interfaces **only** if lifecycle hook was **used** 2.5.4. Business logic should **NOT** be in components. Ideally there are shouldn’t

be any logic. Smart component for managing state, dumb – showing data. Use **services** instead.

1.5.5. Logic free template.

1.5.6. Avoid subscribing to the observable in the component’s **.ts** file. Use *async* pipe instead

1.5.7. Do not forget to **unsubscribe** from the observable on destroy. 1.6.Do **not** ignore ts lint rules.

\2. **Git branching strategy**

2.1.Create new branch for every task/story in jira

2.2.User prefixes as *feature*, *bugfix*, *setup*.

2.2.1. Template: *‘feature/<task-title>-<task-number>’*.

2.2.2. Example: *‘feature/user-form-PI1035’*

\3. **Pull request rules**

3.1.Create smaller pull requests

3.2.In case of big story, create subtasks and make pull requests for each sub task 3.3.Always add/update unit tests for new functionality or bug fix.

3.4.Review your pull request first 

