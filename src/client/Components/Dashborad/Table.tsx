import { Avatar, Box, IconButton, Pagination, PaginationItem } from "@mui/material";
import SouthIcon from '@mui/icons-material/South';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
const Table = (props: {
    dataSchema: any,
    rows: any[],
    actions?: any[],
}) => {
    // type of the colomns and rows props of data grid
    const [columns, setColumns] = useState<MRT_ColumnDef[]>([])
    const rows = props?.rows;
    //customize the header,option like filter order


    useEffect(() => {
        if (props.dataSchema) {
            const dataSchema = props.dataSchema;
            const newColumns = [];
            for (const key in dataSchema) {
                const column: MRT_ColumnDef = {
                    accessorKey: key,
                    header: dataSchema[key].label || key,
                    size: 1,
                };
                if (dataSchema[key].type == 'array') {
                    column.Cell = ({ cell: { row: { original } } }: { cell: { row: { original: any } } }) => {
                        return original[key].length
                    }
                }
                if (dataSchema[key].type == 'image') {
                    column.Cell = ({ cell: { row: { original } } }: { cell: { row: { original: any } } }) => {
                        return <Avatar src={original[key] as string} />
                    }

                }
                newColumns.push(column)
            }
            setColumns(newColumns);
        }
    }, [props.dataSchema, props?.rows])
    const renderRowActions = ({ row }: any) => {
        if (props.actions && props.actions.length > 0) {
            const actions = props.actions?.map((act) => (
                <IconButton
                    key={act.label}
                    color={act.color}
                    onClick={() => act.fct(row.original._id)}
                >
                    {act.icon}
                </IconButton>
            ));
            return (<Box style={{ display: 'flex' }}>
                {actions}
            </Box>)
        }
        return null;
    };
    return (
        <Box>
            <MaterialReactTable
                columns={columns}
                data={rows}
                enableColumnActions={false}
                enableRowSelection
                enableRowActions={true}
                positionActionsColumn='last'
                renderRowActions={renderRowActions}
            />
        </Box>
    )
}

export default Table
