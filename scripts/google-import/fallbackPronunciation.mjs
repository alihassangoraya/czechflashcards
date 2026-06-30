export function pronunciation(value) {
  return value
    .replace(/ch/g, "h").replace(/š/g, "sh").replace(/č/g, "ch").replace(/ž/g, "zh")
    .replace(/ř/g, "rzh").replace(/ě/g, "ye").replace(/[ýí]/g, "ee").replace(/á/g, "aa")
    .replace(/ó/g, "oo").replace(/[úů]/g, "oo").replace(/ď/g, "dy").replace(/ť/g, "ty")
    .replace(/ň/g, "ny").toLowerCase();
}
