import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CircleDashed } from "lucide-react";
export type HeaderType = {
	name: string;
	key: string;
	className?: string;
	customRender?: (data: DataType) => React.ReactNode;
};
type DataType = Record<string, string>;

type DataTableProps = {
	headers: HeaderType[];
	data: DataType[];
	tableFooter?: React.ReactNode;
	caption?: string;
	isLoading?: boolean;
};

export default function DataTable({
	headers,
	data,
	tableFooter,
	caption,
	isLoading,
}: DataTableProps) {
	return (
		<Table>
			{caption && <TableCaption>{caption}</TableCaption>}
			<TableHeader>
				<TableRow>
					{headers.map((header) => (
						<TableHead key={header.key} className={header.className}>
							{header.name}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading && (
					<TableRow>
						<TableCell
							colSpan={headers.length}
							className="flex items-center justify-center p-2 w-full"
						>
							<CircleDashed className="w-4 h-4 animate-spin" />
						</TableCell>
					</TableRow>
				)}
				{data.length == 0 && !isLoading && (
					<TableRow>
						<TableCell
							colSpan={headers.length}
							className="flex items-center justify-center p-2 w-full text-center flex-1"
						>
							No data
						</TableCell>
					</TableRow>
				)}
				{data.map((row, index) => (
					<TableRow key={`row.${index}`}>
						{headers.map((header) => (
							<TableCell
								key={`col-${header.key}-${index}`}
								className={header.className}
							>
								{header.customRender
									? header.customRender(row)
									: row[header.key]}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
			{tableFooter && <TableFooter>{tableFooter}</TableFooter>}
		</Table>
	);
}
