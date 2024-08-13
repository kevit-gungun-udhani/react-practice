import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {
  const isFetching = useIsFetching();
  return (
    <>
      <div id="main-header-loading"></div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
          {isFetching > 0 && <progress/>}
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
