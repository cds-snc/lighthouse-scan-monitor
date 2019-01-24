import React from "react";

const toSeconds = milliseconds => {
  return (milliseconds / 1000.0).toFixed(2);
};

export const ListItem = ({ url, src, time }) => {
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
          <span>{toSeconds(time)}</span>
        </div>
      </div>
    </li>
  );
};
