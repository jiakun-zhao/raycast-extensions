/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Personal access tokens - github.com > Settings > Developer settings > Personal access tokens */
  "auth": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `repos` command */
  export type Repos = ExtensionPreferences & {}
  /** Preferences accessible in the `stars` command */
  export type Stars = ExtensionPreferences & {}
  /** Preferences accessible in the `followed` command */
  export type Followed = ExtensionPreferences & {}
  /** Preferences accessible in the `sync` command */
  export type Sync = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `repos` command */
  export type Repos = {}
  /** Arguments passed to the `stars` command */
  export type Stars = {}
  /** Arguments passed to the `followed` command */
  export type Followed = {}
  /** Arguments passed to the `sync` command */
  export type Sync = {}
}

