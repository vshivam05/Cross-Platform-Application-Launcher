// const API = "http://localhost:2354/api";
const API = "http://192.168.1.105:2354/api";


export async function fetchApps() {
  const res = await fetch(`${API}/apps`);
  return res.json();
}

export function addApp(app) {
  return fetch(`${API}/apps`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(app),
  });
}

export function deleteApp(id) {
  return fetch(`${API}/apps/${id}`, { method: "DELETE" });
}

export function launchApp(app) {
  return fetch(`${API}/launch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(app),
  });
}

export function quitApp() {
  return fetch(`${API}/quit`, { method: "POST" });
}
