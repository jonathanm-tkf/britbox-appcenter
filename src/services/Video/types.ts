export interface MediaSelectorResponse {
  media: Media[];
  disclaimer: string;
}

export interface Media {
  service: string;
  kind: string;
  type: string;
  encoding: string;
  expires: string;
  connection: Connection[];
  width?: string;
  bitrate?: string;
  height?: string;
}

export interface Connection {
  priority: string;
  protocol: Protocol;
  authExpiresOffset: number;
  supplier: Supplier;
  authExpires: string;
  href: string;
  transferFormat: TransferFormat;
  dpw: string;
}

export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https',
}

export enum Supplier {
  MFAkamai = 'mf_akamai',
  MFLimelight = 'mf_limelight',
}

export enum TransferFormat {
  DASH = 'dash',
  HLS = 'hls',
  PLAIN = 'plain',
}

export interface CustomData {
  media: {
    itemVideoCustomId: string | undefined;
    itemVideoMassiveId: string | undefined;
    itemVideoTitle: string | undefined;
  };
  thumbnails?: string;
  subtitles?: string;
}

export interface VideoResponse {
  title: string;
  subtitle: string;
  mediaUrl: string;
  customData: CustomData;
  imageUrl: string;
  posterUrl: string;
}

export interface ErrorCode {
  devMessage: string;
  errorCode: string;
}
