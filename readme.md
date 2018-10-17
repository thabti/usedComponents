# Componentsused

Simple AST parse to identify which React components have been used in a given file


## install


## usage

```
import componentsUsed from 'componentsUsed';

const code = "import { Button } from '../Button';"

const reuslt = componentsUsed(code)
// ['Button']

```
