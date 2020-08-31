/* eslint-disable no-extend-native */
String.prototype.timezone = function () {
  let dateTimeSpecification;
  switch (this) {
    case 'AR':
      dateTimeSpecification = 'America/Argentina/Buenos_Aires';
      break;
    case 'UY':
      dateTimeSpecification = 'America/Montevideo';
      break;
    case 'CL':
      dateTimeSpecification = 'America/Santiago';
      break;
    case 'CO':
      dateTimeSpecification = 'America/Bogota';
      break;
    case 'MX':
      dateTimeSpecification = 'America/Mexico_City';
      break;
    case 'CR':
      dateTimeSpecification = 'America/Costa_Rica';
      break;
    case 'GT':
      dateTimeSpecification = 'America/Guatemala';
      break;
    case 'HN':
      dateTimeSpecification = 'America/Tegucigalpa';
      break;
    case 'SV':
      dateTimeSpecification = 'America/El_Salvador';
      break;
    case 'PA':
      dateTimeSpecification = 'America/Panama';
      break;
    case 'PY':
      dateTimeSpecification = 'America/Asuncion';
      break;
    case 'EC':
      dateTimeSpecification = 'America/Guayaquil';
      break;
    case 'VE':
      dateTimeSpecification = 'America/Caracas';
      break;
    case 'BO':
      dateTimeSpecification = 'America/La_Paz';
      break;
    case 'PE':
      dateTimeSpecification = 'America/Lima';
      break;
    case 'BR':
      dateTimeSpecification = 'America/Sao_Paulo';
      break;
    case 'GY':
      dateTimeSpecification = 'America/Guyana';
      break;
    case 'TT':
      dateTimeSpecification = 'America/Port_of_Spain';
      break;
    case 'SR':
      dateTimeSpecification = 'America/Paramaribo';
      break;
    case 'BB':
      dateTimeSpecification = 'America/Barbados';
      break;
    case 'CW':
      dateTimeSpecification = 'America/Curacao';
      break;
    case 'BS':
      dateTimeSpecification = 'America/Nassau';
      break;
    case 'AW':
      dateTimeSpecification = 'America/Aruba';
      break;
    case 'BQ':
      dateTimeSpecification = 'America/Kralendijk';
      break;
    case 'VG':
      dateTimeSpecification = 'America/Virgin';
      break;
    case 'KY':
      dateTimeSpecification = 'America/Cayman';
      break;
    case 'GD':
      dateTimeSpecification = 'America/Grenada';
      break;
    case 'HT':
      dateTimeSpecification = 'America/Port-au-Prince';
      break;
    case 'JM':
      dateTimeSpecification = 'America/Jamaica';
      break;
    case 'NI':
      dateTimeSpecification = 'America/Managua';
      break;
    case 'DO':
      dateTimeSpecification = 'America/Santo_Domingo';
      break;
    case 'LC':
      dateTimeSpecification = 'America/St_Lucia';
      break;
    case 'SX':
      dateTimeSpecification = 'America/Marigot';
      break;
    case 'VC':
      dateTimeSpecification = 'America/St_Vincent';
      break;
    case 'US':
      dateTimeSpecification = 'America/New_York';
      break;

    default:
      dateTimeSpecification = 'America/Barbados';
      break;
  }
  return dateTimeSpecification;
};
