/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** OpenCode Go API Key - Your OpenCode Go API key */
  "ocgApiKey": string,
  /** DeepSeek API Key - Your DeepSeek API key */
  "dsApiKey": string,
  /** APIMart API Key - Your APIMart API key */
  "apimartApiKey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `usage` command */
  export type Usage = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `usage` command */
  export type Usage = {}
}

