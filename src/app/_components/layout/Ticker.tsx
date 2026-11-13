function Star() {
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 0 57 33 85 15 67 43 100 50 67 57 85 85 57 67 50 100 43 67 15 85 33 57 0 50 33 43 15 15 43 33Z" fill="currentColor" /></svg>;
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1, 2, 3].map((item) => (
          <div className="ticker-group" key={item}>
            <span>Ideas into interfaces</span><Star />
            <span>Data into intelligence</span><Star />
            <span>Code into real things</span><Star />
          </div>
        ))}
      </div>
    </div>
  );
}
