const regexp = {
  //
  allNewLines: /\r?\n|\r/g,
  headerSection: /HEADER;.+?(?=ENDSEC;)/,
  dataSection: /DATA;\s+.+(?=ENDSEC;)/,
  rawIfcType: /IFC\w+/,
  rawIfcProperties: /\(.+?(?=;)/,
  singleIfcItems: /#\d+\s*=\s*IFC.+?\);\s*/g,
  //
  initialComma: /^,/,
  separator: /,/,
  guid: /^'\w{22}'/,
  expressId: /^#\d+/,
  expressIdSet: /\((#\d+|,)+?\)/,
  text: /^'.+?'(?=\s*,)|^'.+?'(?=\s*$)/,
  enum: /\.\w+?\./,
  integer: /\d+/,
  defaultValue: /^\$/,
  emptySet: /^\(\)/,
  //
  boundingApostrophes: /^'|'$/g,
  boundingPoints: /^\.|\.$/g,
};

class ParseUtils {
  getHeaderSection(rawIfcLine) {
    return rawIfcLine.match(regexp.headerSection)[0];
  }

  getDataSection(rawIfcLine) {
    return rawIfcLine.match(regexp.dataSection)[0];
  }

  getGuid(rawIfcLine) {
    return rawIfcLine.match(regexp.guid).toString().slice(1, -1);
  }

  getId(rawIfcLine) {
    return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
  }

  getIdSet(rawIfcLine) {
    return rawIfcLine
      .match(regexp.expressIdSet)[0]
      .toString()
      .slice(1, -1)
      .split(",")
      .map((e) => {
        return parseInt(e.slice(1));
      });
  }

  getIfcType(rawIfcLine) {
    return rawIfcLine.match(regexp.rawIfcType).toString();
  }

  getIfcEnum(rawIfcLine) {
    return rawIfcLine
      .match(regexp.enum)
      .toString()
      .replace(regexp.boundingPoints, "");
  }

  getIfcInteger(rawIfcLine) {
    return parseInt(rawIfcLine.match(regexp.integer).toString());
  }

  getIfcText(rawIfcLine) {
    return rawIfcLine
      .match(regexp.text)
      .toString()
      .replace(regexp.boundingApostrophes, "");
  }

  getDefaultValue(rawIfcLine) {
    return rawIfcLine.match(regexp.defaultValue).toString();
  }

  getIfcRawProperties(rawIfcLine) {
    return rawIfcLine.match(regexp.rawIfcProperties).toString().slice(1, -1);
  }

  removeAllNewLines(ifcFile) {
    return ifcFile.replace(regexp.allNewLines, " ");
  }

  separateIfcEntities(dataSection) {
    return dataSection.match(regexp.singleIfcItems);
  }
}

export { regexp, ParseUtils };