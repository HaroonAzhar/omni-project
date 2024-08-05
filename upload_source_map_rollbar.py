import requests
import os
from pathlib import Path
import argparse


def upload_source_map(rollbar_url, rollbar_token, base_url, version):
    builds_path = Path("build") / Path("static") / Path("js")
    files_in_build = os.listdir(builds_path)
    map_files = [file_name for file_name in files_in_build if ".js.map" in file_name]

    [not_main_map] = [file_name for file_name in map_files if not "main" in file_name]

    chunk_name = not_main_map.replace(".map", "")

    minified_url = f"{base_url}/static/js/{chunk_name}"

    payload = {"version": version, "minified_url": minified_url}
    fp = open(builds_path / Path(not_main_map), "rb")
    files = [("source_map", (not_main_map, fp, "application/octet-stream"))]

    headers = {"X-Rollbar-Access-Token": rollbar_token}

    response = requests.request(
        "POST", rollbar_url, headers=headers, data=payload, files=files, verify=False
    )

    print(response.text)


def main():

    my_parser = argparse.ArgumentParser(description="Uploads source map to rollbar API")
    my_parser.add_argument(
        "--rollbar_url",
        metavar="rollbar_url",
        type=str,
        help="Rollbar API URL for source maps",
        default="https://api.rollbar.com/api/1/sourcemap",
    )

    my_parser.add_argument(
        "--base_url",
        metavar="base_url",
        type=str,
        help="Base URL of the UI application",
        default="https://test.app.omni.co.uk",
    )

    my_parser.add_argument(
        "--version", metavar="version", type=str, help="Code version", default="unknown"
    )

    my_parser.add_argument(
        "--rollbar_token",
        metavar="rollbar_token",
        type=str,
        help="Rollbar API Project Access Tokens with scope post_server_item",
        required=True,
    )

    args = my_parser.parse_args()

    print(args)
    upload_source_map(
        rollbar_url=args.rollbar_url,
        rollbar_token=args.rollbar_token,
        base_url=args.base_url,
        version=args.version,
    )


if __name__ == "__main__":
    main()
