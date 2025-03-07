# API Query Language

## Table of Contents
- [Introduction](#introduction)
- [Basic Syntax](#basic-syntax)
- [Operators](#operators)
- [Examples](#examples)

## Introduction

The API Query Language allows for more advanced filtering and querying of resources beyond basic JSON filtering.

## Basic Syntax

The query language follows this basic structure:

```plaintext
<field> <operator> <value>
```

Multiple conditions can be combined using logical operators:

```plaintext
<condition1> AND <condition2>
<condition1> OR <condition2>
```

## Operators

### Comparison Operators

| Operator | Description |
|----------|-------------|
| `=` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |
| `IN` | Value is in a list |
| `NOT IN` | Value is not in a list |

### Logical Operators

| Operator | Description |
|----------|-------------|
| `AND` | Both conditions must be true |
| `OR` | Either condition must be true |
| `NOT` | Negates a condition |

## Examples

### Simple Equality

```plaintext
status = 'open'
```

### Multiple Conditions

```plaintext
status = 'open' AND priority = 'high'
```

### Range Query

```plaintext
created_at >= '2025-01-01' AND created_at <= '2025-12-31'
```

### List Inclusion

```plaintext
status IN ('open', 'pending')
```

### Complex Query

```plaintext
(status = 'open' OR status = 'pending') AND priority = 'high'
```

> **Note:** The query language does not currently support filtering in sub-fields.
