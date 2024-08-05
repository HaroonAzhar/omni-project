class ValueMapper {
  constructor() {
    this.fields = [];
    this.data = null;
  }

  appendFields(fields) {
    fields.forEach((value) => {
      if (Object.prototype.hasOwnProperty.call(value, "hide") && value.hide)
        return;
      this.fields.push(value);
    });
  }

  setData(data) {
    this.data = data;
  }

  getDataByName(name) {
    const data = this.findField(name);
    return this.findKey(data, name);
  }

  findField(fieldName) {
    const result = this.fields.filter((obj) => obj.name === fieldName);
    if (result.length === 0)
      throw new Error(`Cannot find field by name:${fieldName}`);
    return result[0];
  }

  processObject(key, resultField, fieldName) {
    const field = this.findField(fieldName);
    const result = [];

    if (!Array.isArray(this.data[key])) {
      const objectDataArray = [{}];
      this.data[key] = Object.keys(this.data[key]).map((k) => {
        objectDataArray[0][k] = this.data[key][k];
        return true;
      });
      this.data[key] = objectDataArray;
    }

    this.data[key].forEach((value) => {
      const del = ", ";
      const translateFields = (singleEntry) => {
        if (
          Object.prototype.hasOwnProperty.call(field, "translations") &&
          Object.prototype.hasOwnProperty.call(
            field.translations,
            value[singleEntry]
          )
        ) {
          return field.translations[value[singleEntry]];
        } else {
          return value[singleEntry];
        }
      };
      const transaltedFields = resultField.map(translateFields);
      const validFields = transaltedFields.filter((singleEntry) => singleEntry);
      const str = `${validFields.join(del)} \n`;
      result.push(str);
    });

    // eslint-disable-next-line no-useless-escape
    return result.join("");
  }

  getDataByKey(key, name) {
    if (typeof this.data[Object.keys(key)[0]] === "object") {
      return this.data[Object.keys(key)[0]][key[Object.keys(key)[0]]];
    }
    return this.getData(key, name);
  }

  processContent(result) {
    const regex = /(<%=.?%>)/g;
    const findVars = result.content().match(regex);
    let content = result.content();
    findVars.forEach((value) => {
      const parsedValue = value.replace("<%=", "").replace("%>", "");
      const dataValue = this.getDataByKey(
        result.data_key[parsedValue],
        result.name
      );
      content = content.replace(value, dataValue);
    });
    return content;
  }

  getData(key, name) {
    const field = this.findField(name);
    if (
      Object.prototype.hasOwnProperty.call(field, "translations") &&
      Object.prototype.hasOwnProperty.call(field.translations, this.data[key])
    ) {
      return field.translations[this.data[key]];
    }
    return this.data[key];
  }

  getContent(object, value) {
    if (object.decorate) {
      return object.decorate(value, this.data);
    }

    return value;
  }

  findKey(result) {
    if (typeof result.content === "function")
      return this.getContent(result, this.processContent(result));
    if (typeof result.data_key === "object") {
      return this.getContent(
        result,
        this.processObject(
          Object.keys(result.data_key)[0],
          result.data_key[Object.keys(result.data_key)[0]],
          result.name
        )
      );
    }
    if (
      typeof result.data_key === "string" &&
      Object.prototype.hasOwnProperty.call(this.data, result.data_key)
    ) {
      return this.getContent(
        result,
        this.getData(result.data_key, result.name)
      );
    }

    if (Object.prototype.hasOwnProperty.call(result, "defaultValue"))
      return this.getContent(result, result.defaultValue);
    return "";
    // throw new Error(`Cannot find data property:${result.data_key}`);
  }
}

export default ValueMapper;
