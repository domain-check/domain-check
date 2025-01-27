import type { DomainAvailabilityStatus } from '@/types';
import type { DnsJsonResponse, DnsRecordType } from '@/types/dns';

// TODO: move to config
const dnsURL: string = 'https://cloudflare-dns.com/dns-query';

export const fetchDns = async (domain: string, type: DnsRecordType = 1): Promise<DnsJsonResponse> => {
  try {
    const reponse: Response = await fetch(`${dnsURL}?name=${domain}&type=${type}`, {
      headers: {
        accept: 'application/dns-json'
      }
    });
    if (!reponse.ok) {
      const errorMessage: string = await reponse.text();
      throw new Error(`${errorMessage}`);
    }
    const dnsResponseAsJson: DnsJsonResponse = await reponse.json();
    return dnsResponseAsJson;
  } catch (error: any) {
    throw new Error(error.message ?? error);
  }
}

export const getDomainAvailabilityStatus = async (domain: string): Promise<DomainAvailabilityStatus> => {
  const dnsResponse: DnsJsonResponse = await fetchDns(domain);
  // NOERROR
  if (dnsResponse.Status === 0) {
    return 0; // NOTAVAILABLE 
  }
  // NXDOMAIN && !ANSWER
  if (dnsResponse.Status === 3 && !dnsResponse.Answer) {
    return 1; // AVAILABLE 
  }
  return 2; // UNKNOWN
}