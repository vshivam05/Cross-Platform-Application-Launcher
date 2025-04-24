export default function AppCard({ app, onClick }) {
  return (
    <div onClick={() => onClick(app)} className="app-card">
      {app.icon ? (
        <img src={app.icon} alt={app.name} />
      ) : (
        <div className="app-icon-placeholder">📦</div>
      )}
      <span>{app.name}</span>
    </div>
  );
}
