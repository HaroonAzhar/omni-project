import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    fontSize: 10,
    fontWeight: 600,
    borderColor: "#75787B",
    borderBottomWidth: 1,
  },

  tableCol1: {
    maxWidth: "40%",
    padding: 5,
    paddingRight: 10,
    backgroundColor: "#F4F4F3",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#75787B",
  },
  tableColSmall: {
    width: "40%",
    padding: 5,
    paddingRight: 10,
    backgroundColor: "#F4F4F3",
    borderRightWidth: 1,
    borderColor: "#75787B",
  },
  tableColBig: {
    width: "50%",
    padding: 5,
    paddingRight: 40,
    backgroundColor: "#F4F4F3",
    borderRightWidth: 1,
    borderColor: "#75787B",
  },
  tableCol: {
    width: "38.4%",
    fontWeight: 500,
    padding: 5,
  },
  tableRowHeadBig: {
    maxWidth: "55%",
    padding: 5,
    backgroundColor: "#F4F4F3",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#75787B",
  },
  rowHead: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#75787B",
  },
});

const MainTable = (props) => {
  const { fields, mapper } = props;
  const isPropertyExist = (property, name) => {
    return Object.prototype.hasOwnProperty.call(property, name);
  };

  function createContainer(value, index, elements, style) {
    const containerStyles = [styles.tableRow, style];

    if (index % 2 === 0) {
      containerStyles.push({
        backgroundColor: "#FBFBFA",
      });
    }

    if (
      isPropertyExist(value, "css") &&
      isPropertyExist(value.css, "container")
    ) {
      containerStyles.push(value.css.container);
    }
    return (
      <View key={value.data_key} style={containerStyles} break={value.break}>
        {elements.map((cvalue) => {
          return cvalue;
        })}
      </View>
    );
  }

  const createRow = (value, styleHead, styleContent) => {
    const headStyles = [
      isPropertyExist(value, "style") ? styles[value.style] : styles.tableCol1,
      styleHead,
      styles.rowHead,
    ];
    const rowStyles = [styles.tableCol, styleContent];

    if (
      isPropertyExist(value, "css") &&
      isPropertyExist(value.css, "tableRow")
    ) {
      rowStyles.push(value.css.tableRow);
    }

    if (
      isPropertyExist(value, "css") &&
      isPropertyExist(value.css, "tableRowHead")
    ) {
      headStyles.push(value.css.tableRowHead);
    }

    return (
      <>
        <View style={headStyles}>
          {isPropertyExist(value, "labelRenderer") ? (
            <>{value.label}</>
          ) : (
            <Text>{value.label}</Text>
          )}
          {isPropertyExist(value, "description") ? (
            <Text style={[{ fontWeight: 500 }]}>{value.description}</Text>
          ) : (
            <Text />
          )}
        </View>
        <View style={rowStyles}>
          {isPropertyExist(value, "rowRenderer") ? (
            <>{mapper.getDataByName(value.name)}</>
          ) : (
            <Text>{mapper.getDataByName(value.name)}</Text>
          )}
        </View>
      </>
    );
  };

  function isHideField(value) {
    return isPropertyExist(value, "hide") && value.hide;
  }

  const containers = [];
  fields.forEach((value, index) => {
    if (isHideField(value)) return;
    if (
      value.left &&
      !isHideField(fields[index + 1]) &&
      fields[index + 1] &&
      Object.prototype.hasOwnProperty.call(fields[index + 1], "right")
    ) {
      return;
    }

    if (
      value.right &&
      fields[index - 1].left &&
      !isHideField(fields[index - 1])
    ) {
      const contentBgColor = (index + 2) % 2 === 0 ? "red" : "#FFFFFF";
      containers.push(
        createContainer(`SAMPLE_NAME_${index}`, index, [
          createContainer(
            `SAMPLE_${index}`,
            index,
            [
              createRow(
                fields[index - 1],
                { width: "65%", borderWidth: 0 },
                {
                  width: "55%",
                  backgroundColor: contentBgColor,
                  borderLeftWidth: 1,
                  borderColor: "#75787B",
                }
              ),
              createRow(
                value,
                { width: "65%", borderWidth: 0 },
                {
                  backgroundColor: contentBgColor,
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: "#75787B",
                  width: "46.8%",
                }
              ),
            ],
            { width: "55%", borderWidth: 0 }
          ),
        ])
      );
    } else {
      containers.push(
        createContainer(value, index, [
          createRow(
            value,
            { width: "22%", borderWidth: 0 },
            {
              width: "78%",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "#75787B",
            }
          ),
        ])
      );
    }
  });

  return (
    <>
      {containers.map((value) => {
        return value;
      })}
    </>
  );
};

export default MainTable;

MainTable.propTypes = {
  fields: PropTypes.array.isRequired,
  mapper: PropTypes.object.isRequired,
};
