import React from "react";
import { formattedDate, toSeconds } from "../util";

export const ListItem = ({ url, src, time, updatedAt = "" }) => {
  return (
    <li>
      <div>
        <a alt={url} href={url}>
          <img alt={url} width="100%" src={src} />
        </a>
        <div className="info">
          <a alt={url} href={url}>
            {url}
          </a>
          <span className="muted">{formattedDate(updatedAt)}</span>
          <div>
            <span className="muted">{toSeconds(time)} secs</span>
          </div>
        </div>
      </div>
    </li>
  );
};
