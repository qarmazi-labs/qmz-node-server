class Util {
  static snakeToCamel(str) {
      return str.toLowerCase().replace(/_\w/g, (m) => m[1].toUpperCase() );
  }

  static kebabToCamel(str) {
      return str.toLowerCase().replace(/-\w/g, (m) => m[1].toUpperCase() );
  }
}

module.exports = Util;
