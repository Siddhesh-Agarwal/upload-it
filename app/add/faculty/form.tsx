import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const departments: unknown = ["CSE", "IT", "AIDS", "CSBS", "MTech. CSE", "CSE CS", "CSD", "ECE", "EEE", "MECH", "MCT", "CIVIL"]
const designations: unknown = ["Assistant Professor", "Assosiate Professor", "Professor"]
const formSchema = z.object({
    facultyName: z.string(),
    department: z.enum(departments as const),
    designation: z.enum(designations as const),
    email: z.coerce.string().toLowerCase().email({ message: "Invalid Email" }).endsWith("@skcet.ac.in", {message: "Use @skcet.ac.in mail"}),
    facultyID: z.string().toUpperCase(),
})

export default function FacultyForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO: add to supabase
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1 className="scroll-m-20 text-4xl text-center mb-4 font-extrabold tracking-tight lg:text-5xl mx-2 md:mx-6 lg:mx-10">
                    Add Faculty
                </h1>
                <FormField
                    control={form.control}
                    name="facultyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Faculty Name
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row w-full">
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem className="w-1/2 pr-1">
                                <FormLabel>Department</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the department" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            (departments as string[]).map((department: string, index: number) => {
                                                return (
                                                    <SelectItem value={department} key={index}>{department}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                            <FormItem className="w-1/2 pl-1">
                                <FormLabel>Designation</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the designation" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            (designations as string[]).map((designations: string, index: number) => {
                                                return (
                                                    <SelectItem value={designations} key={index}>{designations}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email ID
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="janedoe@skcet.ac.in" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="facultyID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Faculty ID
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="CSE001" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>

        </Form>
    )
}