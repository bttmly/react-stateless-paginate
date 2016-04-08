# react-stateless-paginate

**A ReactJS component to render a pagination.**

## About this fork
This package is a fork of [react-paginate](https://github.com/AdeleD/react-paginate), however instead of using internal state and `React.Component` subclasses, it uses [stateless functional components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d). As such, there are no event handlers. When using this package, you should treat the pagination links as just that – links. Let your router do the heavy lifting. This also makes it a good fit for other uses – specifically, server-rendered applications using React as a "templating" layer.

For details about the package, please see the [source repo](https://github.com/AdeleD/react-paginate). Might add details specific to this fork in the future.

## Installing
`npm install react-paginate-functional`
