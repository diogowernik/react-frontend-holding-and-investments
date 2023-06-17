// Remove the import of withFetchData here
const RadarTemplate = ({ data, TableComponent, title }) => {
  return (
    <>
      {/* lots of layout */}
      <h2>{title}</h2>
      <TableComponent data={data} />
      {/* lots of layout */}
    </>
  );
};

// Do not use withFetchData here
export default RadarTemplate;
