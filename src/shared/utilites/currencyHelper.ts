import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
const PADDING = '000000';
let FRACTION_SIZE = 2;
const PREFIX = '';
const DECIMAL_SEPARATOR = '.';
const THOUSANDS_SEPARATOR = '$1\'';
const SUFFIX = '';
/**
 * Calculate caret position from right side.
 * @param event from OnKeyDown event
 */
export function processKeyDown(event) {
  const keyCode = event.event.keyCode;
  const ctrl = document.getElementById(event.element.id).getElementsByTagName('input')[0];
  let caretPositionFromRight = ctrl.value.length - ctrl.selectionStart;

  if (!(isNumber(keyCode)
    || isArrowKey(keyCode)
    || isPressedBackSpace(keyCode)
    || isPressedTabKey(keyCode)
    || isPressedMinusKey(keyCode))) {
    event.event.preventDefault();
    return 0;
  }

  if ((ctrl.value[0] !== '-') && isPressedMinusKey(keyCode)) {
    event.event.preventDefault();
    ctrl.value = '-' + ctrl.value;
    setCaretPosition(ctrl, ctrl.value.length - caretPositionFromRight);
    return caretPositionFromRight;
  }

  if (isPressedMinusKey(keyCode) && ((ctrl.selectionStart !== 0) || (ctrl.value[0] === '-'))) {
    event.event.preventDefault();
    return 0;
  }

  if ((ctrl.value[0] === '-') && isPressedLeftArrow(keyCode) && (ctrl.selectionStart === 1)) {
    event.event.preventDefault();
    return 0;
  }

  if ((ctrl.value[0] === '-') && isPressedUpArrow(keyCode)) {
    event.event.preventDefault();
    return 0;
  }

  if (ctrl.value.length < FRACTION_SIZE) {
    return caretPositionFromRight;
  }

  if (isPressedDotKey(keyCode)) {
    event.event.preventDefault();
    setCaretAfterDot(event, ctrl);
    return caretPositionFromRight;
  }

  if (isCaretWithinFractionZone(caretPositionFromRight)) {
    if (!isPressedBackSpace(keyCode)) {
      if ((caretPositionFromRight === 0) && !isPressedLeftArrow(keyCode)) {
        event.event.preventDefault();
      } else {
        caretPositionFromRight -= 1;
      }
    } else if (caretPositionFromRight === FRACTION_SIZE) {
      event.event.preventDefault();
    } else {
      caretPositionFromRight += 1;
    }
  }

  return caretPositionFromRight;
}

/**
 * Transform input value and set caret position
 * @param event from OnValueChanged event with keyup trigger
 * @param keyDownCaret from process OnKeyDown
 */
export function processValueChanged(event, keyDownCaret) {
  const value = event.value || [];
  const ctrl = event.element.getElementsByTagName('input')[0];
  const minus = value[0] || '';
  let result = transform(parse(value.toString()));
  while (result.toString().charAt(0) === '\'' || ((result.toString().charAt(0) === '0') && (result.toString().charAt(1) !== '\.'))) {
    result = result.toString().substring(1);
    keyDownCaret = result.length;
  }
  result = minus + result;
  event.value = result;
  if (result !== value) {
    ctrl.value = result;
    calculateAndSetCaretPosition(ctrl, value, result, keyDownCaret);
  }
  event.component._options.value = result;
  return result;
}

export function formatNumber(value) {
  if (isNullOrUndefined(value)) {
    return value;
  } if (value === 0) {
    return '0.00';
  }
  const minus = value[0] === '-' ? '-' : '';
  return minus + transform(parse(value.toString()));
}

/**
 * Transform float format to currency format in string
 * @param value is string that be float format
 */
export function transform(value: string): string {
  let [integer, fraction = ''] = (value || '').toString()
    .split(DECIMAL_SEPARATOR);

  fraction = FRACTION_SIZE > 0
    ? DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, FRACTION_SIZE)
    : '';

  integer = integer.replace(/(\d)(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

  return PREFIX + integer + fraction + SUFFIX;
}

/**
 * parse currency format to float format in string
 * @param value is string that be currency format
 */
export function parse(value: string): string {
  let [integer, fraction = ''] = (value || '').replace(PREFIX, '')
    .replace(SUFFIX, '')
    .split(DECIMAL_SEPARATOR);

  integer = integer.replace(/[^0-9{DECIMAL_SEPARATOR}]/g, '');

  fraction = parseInt(fraction, 10) > 0 && FRACTION_SIZE > 0
    ? DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, FRACTION_SIZE)
    : '';

  return integer + fraction;
}

export function parseFloat(value: string) {
  const minus = value[0] === '-' ? '-' : '';
  return Number(minus + parse(value));
}

export function isNumber(keyCode) {
  return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
}

export function isArrowKey(keyCode) {
  return (keyCode >= 37 && keyCode <= 40);
}

export function isPressedTabKey(keyCode) {
  return keyCode === 9;
}

export function isPressedDotKey(keyCode) {
  return keyCode === AppEnums.KeyCode.Dot;
}

export function isPressedMinusKey(keyCode) {
  return keyCode === 189;
}

export function isCaretWithinFractionZone(pos) {
  return (pos < FRACTION_SIZE + 1);
}

export function isPressedBackSpace(keyCode) {
  return keyCode === AppEnums.KeyCode.BackSpace;
}

export function isPressedLeftArrow(keyCode) {
  return keyCode === AppEnums.KeyCode.LeftArrowKey;
}

export function isPressedUpArrow(keyCode) {
  return keyCode === AppEnums.KeyCode.UpArrowKey;
}

export function calculateAndSetCaretPosition(ctrl, value, result, keyDownCaret) {
  let caretPos = result.length - keyDownCaret;
  if (value.length < 2) {
    caretPos = result.length - FRACTION_SIZE - 1;
  }
  setCaretPosition(ctrl, caretPos);
}

export function setCaretAfterDot(event, ctrl) {
  setCaretPosition(ctrl, ctrl.value.length - FRACTION_SIZE);
}

export function setCaretPosition(ctrl, pos) {
  if (pos < 0) {
    pos = 0;
  }
  if (ctrl.setSelectionRange) {
    // ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
}
export function setFactionSize(factionSize) {
  FRACTION_SIZE = factionSize;
}
