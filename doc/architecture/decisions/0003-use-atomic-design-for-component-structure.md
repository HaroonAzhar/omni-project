# 3. use-atomic-design-for-component-structure

Date: 2019-12-19

## Status

Accepted

## Context

The application consist of a lot of REACT components.
We need to structure them to find components faster in the future.

Few soluctions for the project structure:
- No structure. Just components folder with all.
- Components and Containers folder.
  All small components in components folder. Bigger components that contains a lot of other components - in Containers folder. This solution can works with a small application.
- [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/)



## Decision

In the ucreate projects we usually use [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) to this purpose.
There is `atom`, `molecule`, `organism`, `templates` and `pages` component types, but
**in Omni project we have a lot of forms. That's why it is good to add one more type - `forms`.**
Below is description of each one.

#### atoms, molecules, organisms, templates, pages
The description of these types is available [here](https://bradfrost.com/blog/post/atomic-web-design/)

#### forms
There are folders with a family of forms and folders with form components.

For example, when we need to create the login form, we can add the folder called `login_form` here and create `index.js` with the component inside.

When we have a much bigger form with steps, I decided creating a folder with the name of flow (eg. dip_forms_steps) and add here file with form related to a particular step.

Tree example:
```
components
  forms
    login_form
     - index.js
    dip_forms_steps
      - company_details_form.js
      - type_of_applicant_form.js
      - index.js
```

## Consequences
The naming of types can be not much obvious on first sight.

We could be not sure what can be molecule or organism because both contain other components.

Sometimes there is a page that we don't want to create as template firstly (for example this is the unique page)
