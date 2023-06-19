import { HttpStatus } from '@nestjs/common';

export const statusMessages: Record<keyof typeof HttpStatus, string> = {
  CONTINUE: 'The request received, please continue',
  SWITCHING_PROTOCOLS: 'Server is switching protocols as requested',
  OK: 'Request was successful',
  CREATED: 'Resource was successfully created',
  ACCEPTED: 'Request has been accepted for processing',
  NON_AUTHORITATIVE_INFORMATION: 'Information returned is from a third party',
  NO_CONTENT: 'No content to return, but request was successful',
  RESET_CONTENT: 'Content reset, clear form for further input',
  PARTIAL_CONTENT: 'Partial content has been provided',
  MOVED_PERMANENTLY: 'Resource has been moved permanently',
  FOUND: 'Resource was found',
  SEE_OTHER: 'Refer to another URI for the response',
  NOT_MODIFIED: 'Resource has not been modified',
  TEMPORARY_REDIRECT: 'Resource temporarily moved, use the given URI',
  BAD_REQUEST: 'The request could not be understood by the server',
  UNAUTHORIZED: 'Authentication is required to access the resource',
  PAYMENT_REQUIRED: 'Payment is required',
  FORBIDDEN: 'Server refuses to fulfill the request',
  NOT_FOUND: 'Requested resource could not be found',
  METHOD_NOT_ALLOWED: 'Request method is not allowed',
  NOT_ACCEPTABLE:
    'Server cannot produce a response matching the list of acceptable values',
  PROXY_AUTHENTICATION_REQUIRED: 'Client must authenticate with the proxy',
  REQUEST_TIMEOUT: 'Server timed out waiting for the request',
  CONFLICT: 'Request could not be completed due to a conflict',
  GONE: 'Requested resource is no longer available and will not be available again',
  LENGTH_REQUIRED: 'Request did not specify the length of its content',
  PRECONDITION_FAILED:
    'Server does not meet one of the preconditions that the requester put on the request',
  PAYLOAD_TOO_LARGE: 'Request payload is too large',
  URI_TOO_LONG: 'The URI provided was too long to process',
  UNSUPPORTED_MEDIA_TYPE:
    'Request entity has a media type which the server or resource does not support',
  EXPECTATION_FAILED:
    'Server could not meet the expectation given in the Expect request-header field',
  INTERNAL_SERVER_ERROR: 'Server encountered an internal error',
  NOT_IMPLEMENTED:
    'Server does not support the functionality required to fulfill the request',
  BAD_GATEWAY:
    'Server received an invalid response while acting as a gateway or proxy',
  SERVICE_UNAVAILABLE: 'Server is currently unavailable',
  GATEWAY_TIMEOUT:
    'Server did not receive a timely response from the upstream server',
  HTTP_VERSION_NOT_SUPPORTED:
    'Server does not support the HTTP protocol version used in the request',
  AMBIGUOUS: 'Request could be processed in multiple ways',
  EARLYHINTS: 'Early hints about forthcoming response',
  FAILED_DEPENDENCY: 'Failed dependency, operation could not be completed',
  I_AM_A_TEAPOT: "I'm a teapot, request cannot be processed",
  MISDIRECTED: 'Request was sent to a server not able to produce a response',
  PERMANENT_REDIRECT: 'Resource has been permanently moved to a new URL',
  PRECONDITION_REQUIRED:
    'Precondition required, please fulfill preconditions first',
  PROCESSING: 'Processing the request, hold on',
  REQUESTED_RANGE_NOT_SATISFIABLE:
    'Requested range cannot be satisfied, please request a valid range',
  TOO_MANY_REQUESTS: 'Too many requests, slow down',
  UNPROCESSABLE_ENTITY:
    'Unprocessable entity, request cannot be processed due to semantic errors',
};
