import React, { useState, useEffect } from "react";
import { request } from "@strapi/helper-plugin";
import { Button } from "@strapi/design-system/Button";
import { Select, Option } from "@strapi/design-system/Select";
import { TextInput } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";
import {
  Box,
  Typography,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@strapi/design-system";
import { Alert } from "@strapi/design-system/Alert";
import { TextButton } from "@strapi/design-system/TextButton";
import pluginId from "../../pluginId";

const HomePage: React.FC = () => {
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<number | null>();
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [sortField, setSortField] = useState<string>(""); // Track current sort field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Track current sort order
  const [contentTypes, setContentTypes] = useState<any[]>([]);
  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const response = await request(
          `/${pluginId}/export/get-content-types`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Filter out content types that are not visible
          const visibleContentTypes = data.filter(
            (contentType: any) => contentType.schema.visible
          );

          if (visibleContentTypes && Array.isArray(visibleContentTypes)) {
            setContentTypes(visibleContentTypes); // Set only the visible content types
            console.log("Fetched visible content types:", visibleContentTypes);
          } else {
            console.error("Unexpected data format:", data);
          }
        } else {
          console.error(
            `Fetch error: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch content types:", error);
      }
    };

    const initialize = async () => {
      await fetchContentTypes();
      console.log("Content types fetched successfully!");
    };

    initialize();
  }, []); // Empty dependency array means it runs once on component mount
  // Helper function to capitalize the first letter of a string
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Helper function to flatten nested JSON objects, format keys as User-Address, and exclude 'id' fields
  const flattenObject = (obj: any, parent: string = "", res: any = {}) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Skip 'id' fields
        if (key.toLowerCase() === "id") {
          continue;
        }

        const propName = parent
          ? `${parent}-${capitalize(key)}`
          : capitalize(key); // Use hyphen instead of dot
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          flattenObject(obj[key], propName, res); // Recursively flatten nested objects
        } else {
          res[propName] = obj[key]; // Assign the value to the result object
        }
      }
    }
    return res;
  };
  // Helper function to convert JSON data to CSV format (supports nested objects)
  const jsonToCsv = (jsonData: any) => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return null;
    }

    // Flatten all objects in the array
    const flattenedData = jsonData.map((row: any) => flattenObject(row));

    // Extract headers from the first flattened row
    const headers = Object.keys(flattenedData[0]);

    // Map rows to CSV format
    const csvRows = flattenedData.map((row: any) =>
      headers
        .map((field) => {
          const value = row[field] ? row[field].toString() : "";
          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    // Return headers and CSV rows
    return [headers.join(","), ...csvRows].join("\n");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedContentType) return;

      setIsFetching(true);

      try {
        let response;

        response = await request(`/${pluginId}/export/csv`, {
          method: "POST",
          body: {
            modelName: selectedContentType,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response && response.length > 0) {
          const flattenedResponse = response.map((row: any) =>
            flattenObject(row)
          ); // Flatten the response
          setData(flattenedResponse);
          setMessage("Data fetched successfully!");
          setAlertVariant("success");
        } else {
          setMessage("No data found.");
          setAlertVariant("danger");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data.");
        setAlertVariant("danger");
        setData([]);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [selectedContentType, challengeId, contentTypes]);

  const handleDownload = () => {
    const csvData = jsonToCsv(data);
    if (!csvData) {
      setMessage("Error converting data to CSV.");
      setAlertVariant("danger");
      return;
    }

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    setCsvUrl(url);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedContentType}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenModal = (content: string, field: string) => {
    setModalContent(content);
    setModalVisible(true);
    setModalTitle(field);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent("");
    setModalTitle("");
  };

  // Sort data by field and order
  const sortData = (field: string) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Box padding={4}>
      <Typography variant="alpha">Export Content Type to CSV</Typography>

      <Box paddingTop={4} width="500px">
        <Flex alignItems="center" gap="6" direction="row">
          <Box width="250px">
            <Select
              label="Select a Content Type"
              placeholder="Select..."
              value={selectedContentType}
              onChange={setSelectedContentType}
            >
              {contentTypes.map((contentType) => (
                <Option key={contentType.uid} value={contentType.uid}>
                  {contentType.schema.displayName || contentType.apiID}
                </Option>
              ))}
            </Select>
          </Box>
        </Flex>

        {selectedContentType === "submissions" && (
          <Flex alignItems="center" gap="6" direction="row" paddingTop={4}>
            <Box width="250px">
              <TextInput
                label="Filter by Challenge ID"
                placeholder="Enter ID..."
                value={challengeId}
                onChange={(e: any) => setChallengeId(e.target.value)}
              />
            </Box>
          </Flex>
        )}
      </Box>

      {message && (
        <Box paddingTop={4} width="85vw">
          <Alert title="Export Status" variant={alertVariant}>
            {message}
          </Alert>
        </Box>
      )}

      {data.length > 0 && (
        <Box paddingTop={4}>
          <Button onClick={handleDownload}>Download CSV</Button>
        </Box>
      )}

      {data.length > 0 && (
        <Box paddingTop={4}>
          <Table colCount={Object.keys(data[0]).length}>
            <Thead>
              <Tr>
                {Object.keys(data[0]).map((header) => (
                  <Th
                    key={header}
                    onClick={() => sortData(header)} // Sort by column on click
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {header}{" "}
                    {sortField === header && (sortOrder === "asc" ? "↑" : "↓")}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, index) => (
                <Tr key={index}>
                  {Object.keys(row).map((field) => (
                    <Td
                      key={field}
                      onClick={() => handleOpenModal(row[field], field)}
                      style={{
                        cursor: "pointer",
                        maxWidth: "800px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row[field]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {modalVisible && (
        <ModalLayout onClose={handleCloseModal} labelledBy="full-text-modal">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800">
              {modalTitle}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Typography>{modalContent}</Typography>
          </ModalBody>
          <ModalFooter
            startActions={
              <TextButton onClick={handleCloseModal}>Close</TextButton>
            }
          />
        </ModalLayout>
      )}
    </Box>
  );
};

export default HomePage;
