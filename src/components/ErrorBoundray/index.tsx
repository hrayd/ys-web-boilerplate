import { ComponentType } from "react";
import ErrorBoundary from "./ErrorBoundary";

const withErrorBoundary =
  (C: ComponentType): ComponentType =>
  () =>
    (
      <ErrorBoundary>
        <C />
      </ErrorBoundary>
    );

export default withErrorBoundary;
