export const getData = item => {
  const data = item.data();
  const url = data.url;
  const src = data.data.audits["final-screenshot"].details.data;
  const time = data.data.audits.interactive.rawValue;
  return { url, src, time };
};
