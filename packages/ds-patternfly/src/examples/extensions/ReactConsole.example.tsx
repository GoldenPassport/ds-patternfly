/**
 * React console (@patternfly/react-console) — remote-console viewers:
 * Serial (xterm.js wrapper), VNC (noVNC), and Desktop. Used in
 * OpenShift-style admin UIs where the user needs an in-browser terminal
 * or graphical session into a VM.
 *
 * These components depend on heavy runtime libraries and a live backend
 * connection — code-only recipes; wire them to your own transport.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  AccessConsoles,
  SerialConsole,
  VncConsole,
} from "@patternfly/react-console";

type SerialStatus = "connected" | "disconnected" | "loading";

// #region AccessConsolesWrapper
export function VmConsole() {
  // Replace this local state with your WebSocket / proxy transport.
  const [serialStatus, setSerialStatus] = useState<SerialStatus>("disconnected");

  return (
    <AccessConsoles preselectedType="SerialConsole">
      <SerialConsole
        onConnect={() => setSerialStatus("connected")}
        onDisconnect={() => setSerialStatus("disconnected")}
        onData={(input) => console.log("send to backend:", input)}
        status={serialStatus} // 'connected' | 'disconnected' | 'loading'
      />
      <VncConsole
        host="vm-host.example.com"
        port="6080"
        path="/websockify"
        encrypt
        credentials={{ password: "secret" }}
      />
    </AccessConsoles>
  );
}
// #endregion

// #region SerialConsoleRecipe
export function SerialConsoleRecipe() {
  const [status, setStatus] = useState<SerialStatus>("disconnected");
  // In a real app: open / close a WebSocket and forward keystrokes.
  return (
    <SerialConsole
      onConnect={() => setStatus("connected")}
      onDisconnect={() => setStatus("disconnected")}
      onData={(input) => console.log("ws.send:", input)}
      status={status}
      cols={80}
      rows={24}
      fontFamily="Menlo, Monaco, monospace"
      fontSize={13}
      textConnect="Connect"
      textDisconnect="Disconnect"
      textReset="Reset"
    />
  );
}
// #endregion

// #region VncConsoleRecipe
export function VncConsoleRecipe() {
  return (
    <VncConsole
      host="vm-host.example.com"
      port="6080"
      path="/websockify"
      encrypt
      shared
      credentials={{ password: "secret" }}
      textConnect="Connect"
      textConnecting="Connecting…"
      textDisconnected="Disconnected"
      textSendShortcut="Send key"
      textCtrlAltDel="Ctrl + Alt + Del"
      consoleContainerId="vnc-container"
    />
  );
}
// #endregion

export default function ReactConsoleExample() {
  return <VmConsole />;
}
