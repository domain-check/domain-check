export const isDomainValid = (domainName: string): boolean => {
  const [label, tld, ...trash] = domainName.split('.');
  if (!label || trash.length > 0) {
    return false;
  }
  return isLabelValid(label) && (tld === undefined || isTldValid(tld));
}

export const isLabelValid = (label: string): boolean => {
  const labelRegex = /^[a-zA-Z0-9-]{1,63}$/;
  return labelRegex.test(label);
}

export const isTldValid = (tld: string): boolean => {
  const tldRegex = /^[a-zA-Z]{2,24}$/;
  return tldRegex.test(tld);
}