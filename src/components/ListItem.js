import React from "react";
import { format } from "date-fns";

const formattedDate = date => {
  return format(date, "MM/DD/YYYY");
};

const toSeconds = milliseconds => {
  return (milliseconds / 1000.0).toFixed(2);
};

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
          <span>{formattedDate(updatedAt)}</span>
          <div>
            <span>{toSeconds(time)} secs</span>
          </div>
        </div>
      </div>
    </li>
  );
};
