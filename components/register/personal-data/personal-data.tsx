"use client";

import usePersonalData from "@/app/hooks/use-personal-data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabaseClient } from "@/lib/superbase-client";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const genders = [
  { label: "Male", value: "male", icon: BsGenderMale, color: "text-blue-600" },
  {
    label: "Female",
    value: "female",
    icon: BsGenderFemale,
    color: "text-pink-600",
  },
];

const dataSchema = z.object({
  height: z.string(),
  gender: z.string(),
});

type PersonalDataFormValues = z.infer<typeof dataSchema>;

const PersonalData = () => {
  const { getToken, userId } = useAuth();
  const { personalData, setPersonalData } = usePersonalData();

  const form = useForm<PersonalDataFormValues>({
    resolver: zodResolver(dataSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (personalData == null || personalData == undefined) {
          const supabaseAccessToken = await getToken({
            template: "supabase",
          });
          const supabase = await supabaseClient(supabaseAccessToken!);

          const { data } = await supabase.from("personal-data").select("*");
          setPersonalData(data![0]);
        }
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong...");
      }
    };
    loadData();
    if (personalData) {
      form.reset({
        height: personalData.height.toString(),
        gender: personalData.gender.toString(),
      });
    }
  }, [getToken, personalData, setPersonalData, form]);

  const onSubmit = async (values: PersonalDataFormValues) => {
    try {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken!);
      if (personalData) {
        const { data } = await supabase
          .from("personal-data")
          .update({
            height: parseInt(values.height),
            gender: values.gender,
          })
          .eq("user_id", userId)
          .select();
        setPersonalData(data![0]);
      } else {
        const { data } = await supabase
          .from("personal-data")
          .insert({
            height: parseInt(values.height),
            gender: values.gender,
            user_id: userId,
          })
          .select();
        setPersonalData(data![0]);
      }

      toast.success("Registration completed.");
      form.reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex items-center justify-center w-full"
      >
        <div className="flex items-center justify-center space-x-2 max-w-md">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Titolo</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Height [cm]" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Priorità</FormLabel> */}
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sex" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((g) => (
                          <SelectItem key={g.label} value={g.value}>
                            <div className="flex items-start">
                              {g.icon && (
                                <g.icon
                                  className={cn("mr-2 h-4 w-4", g.color)}
                                />
                              )}
                              <span>{g.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {personalData ? (
            <Button
              type="submit"
              // disabled={loading}
              size="lg"
              variant="premium"
              className="flex-1 h-10"
            >
              Update
              <PlusCircle className="w-4 h-4 ml-2 " />
            </Button>
          ) : (
            <Button
              type="submit"
              // disabled={loading}
              size="lg"
              variant="premium"
              className="flex-1 h-10"
            >
              Add
              <PlusCircle className="w-4 h-4 ml-2 " />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default PersonalData;
