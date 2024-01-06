---
slug: Migrate-Alfred-Snippets-to-Raycast
title: Migrate Alfred Snippets to Raycast
authors: [wifecooky]
tags: [alfred, snippets, raycast]
---

## 0. Background

I have been using the snippet feature of [Alfred 3](https://www.alfredapp.com/), but the `Alfred` snippet feature is paid.

Recently, I discovered [Raycast](https://www.raycast.com/), where the `Raycast` snippet feature is free and open-source, allowing for personal customization.

Therefore, I plan to migrate my `Alfred` snippets to `Raycast`.

## 1. Migrate Alfred Snippets to Raycast

The format of `Alfred`'s snippet files differs from that of `Raycast`'s snippet files. Hence, it is necessary to first convert `Alfred`'s snippet files to `Raycast`'s snippet files.

```mermaid
graph LR;
    A[Get Alfred Snippets Files] --> B[Convert Alfred Snippets to Raycast Snippets];
    B --> C[Import Raycast Snippets];
```

### 1.1 Get Alfred Snippets Files

Open the `Snippets` feature in `Alfred`, click the `Export` button to export the `Alfred` snippets. Since collections in Alfred 3 do not support bulk export, they need to be exported one by one. :dog:

![img](export-alfred-snippets.png)

### 1.2 Convert Alfred Snippets to Raycast Snippets

Create a new folder and place the exported `Alfred` snippet files in it.

Then, create a file named `convert-alfred-snippets-to-raycast-snippets.sh` in this folder, with the following content:

<details>
<summary>convert-alfred-snippets-to-raycast-snippets.sh</summary>

```bash
#!/bin/sh -e
# Script for converting Alfred snippets to Raycast snippets
# Usage: chmod +x convert-alfred-snippets-to-raycast-snippets.sh; ./convert-alfred-snippets-to-raycast-snippets.sh
# NOTE: Install jq before running this script

# List up all *.alfredsnippets files and rename them to *.zip
for file in *.alfredsnippets; do
    mv "$file" "${file%.alfredsnippets}.zip"
done

# Unzip all *.zip files and get the folders name
for file in *.zip; do
    unzip -o "$file" # -o: overwrite existing files without prompting
done


# Merge all *.json files to one file for Raycast snippets
jq -s 'map(.alfredsnippet | {name, keyword, text: .snippet})' *.json > ./output.json

# Clean up all files except output.json
for file in *.json; do
    if [ "$file" = "output.json" ]; then
        continue
    fi
    rm "$file"
done

for file in *.zip; do
    rm "$file"
done

for file in *.plist; do
    rm "$file"
done

# You can now import the output.json file to Raycast

echo "Done! 🎉 You can now import the output.json file to Raycast -> Import Snippets"
```
</details>

OR download from Github gist: [convert-alfred-snippets-to-raycast-snippets.sh](https://gist.github.com/wifecooky/399dd58809778286c857566d8c93b937)

:::note
To execute this script, you need to install `jq`, which is a command-line JSON processor tool.

For Mac, you can install `jq` using Homebrew with the command: `brew install jq`.
You can also refer to the [official website](https://stedolan.github.io/jq/download/) for more installation options.
:::

Run the following command:

```bash
chmod +x convert-alfred-snippets-to-raycast-snippets.sh
./convert-alfred-snippets-to-raycast-snippets.sh
```

An `output.json` file will be generated in the current directory.

### 1.3 Import Raycast Snippets

Open `Raycast`, then click on `Import Snippets`. Choose the `output.json` file generated in the previous step to import the snippets into `Raycast`.

## Reference

[Migrating Alfred Snippets to Raycast](https://xavd.id/blog/post/migrating-alfred-snippets-to-raycast/)
