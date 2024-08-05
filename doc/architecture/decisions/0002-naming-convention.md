# 2. naming convention

Date: 2019-11-19

## Status

Accepted

## Context

We need to establish one rule for variable, file naming to sustain readability of our codebase.

Code editors use fonts that usually distinct each letter, (eg: the `I` and `l` letters) so in the code easily we can use camelCase, but unfortunately, the tree of files use a regular font, so eg: letter `I` and `l` looks the same. (`Il` = Il).

## Decision

Because of `camelCase` is strongly rooted among JavaScript developers we will use:  
`sneak_case` for file and catalog names  
`camelCase` for variable names

## Consequences

Naming consistency would be better with using the same naming practice in the whole project.
