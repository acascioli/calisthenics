"use client";

import { useContext, useState } from "react";
import { CalendarIcon, Check, PlusCircle, Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { supabaseClient } from "@/lib/superbase-client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { addMeasureSchema } from "@/schemas/measurements-schema";
import useMeasureModal from "@/app/hooks/use-measure-modal";
import useMeasurements from "@/app/hooks/use-measurements";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import {
  calculateBodyFatFemale,
  calculateBodyFatMale,
} from "@/lib/body-fat-index";
import usePersonalData from "@/app/hooks/use-personal-data";

type MeasurementsFormValues = z.infer<typeof addMeasureSchema>;

// This can come from your database or API.
const defaultValues: Partial<MeasurementsFormValues> = {};

const MeasureModal = () => {
  const measureModal = useMeasureModal();
  const { measurements, setMeasurements } = useMeasurements();
  const { personalData, setPersonalData } = usePersonalData();
  const [loading, setLoading] = useState(false);
  const { getToken, userId } = useAuth();

  const form = useForm<MeasurementsFormValues>({
    resolver: zodResolver(addMeasureSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: MeasurementsFormValues) => {
    let bf = 0;
    if (personalData) {
      if (personalData!.gender == "male") {
        if (values.abdomen && values.neck && personalData?.height) {
          bf = calculateBodyFatMale(
            parseFloat(values.abdomen),
            parseFloat(values.neck),
            personalData.height
          );
        }
      }
      if (personalData!.gender == "female") {
        if (values.waist && values.hip && values.neck && personalData?.height) {
          bf = calculateBodyFatFemale(
            parseFloat(values.waist),
            parseFloat(values.hip),
            parseFloat(values.neck),
            personalData.height
          );
        }
      }
    }
    try {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken!);

      const { data } = await supabase
        .from("measurements")
        .insert({
          bf_index: bf,
          weight: parseFloat(values.weight),
          neck: values.neck ? parseFloat(values.neck!) : 0,
          chest: values.chest ? parseFloat(values.chest!) : 0,
          biceps: values.biceps ? parseFloat(values.biceps!) : 0,
          abdomen: values.abdomen ? parseFloat(values.abdomen!) : 0,
          waist: values.waist ? parseFloat(values.waist!) : 0,
          hip: values.hip ? parseFloat(values.hip!) : 0,
          buttocks: values.buttocks ? parseFloat(values.buttocks!) : 0,
          thigh: values.thigh ? parseFloat(values.thigh!) : 0,
          calf: values.calf ? parseFloat(values.calf!) : 0,
          measure_date: values.measure_date,
          user_id: userId,
        })
        .select()
        .order("id");
      setMeasurements([...measurements!, data![0]]);

      toast.success("Registration completed.");
      form.reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong...");
    } finally {
      measureModal.onClose();
    }
  };

  return (
    <Dialog open={measureModal.isOpen} onOpenChange={measureModal.onClose}>
      <DialogContent className="fixed h-auto w-5/6 overflow-y-auto border-none rounded-lg shadow-xl dark:shadow-blue-900">
        {/* <ScrollArea className="h-[300px] p-4 md:p-0 md:h-full"> */}
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Add measurements
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 md:space-y-2 font-medium">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 md:px-2"
              >
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Weight [kg]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="neck"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Neck [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="chest"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Chest [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="biceps"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Biceps [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="abdomen"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Abdomen [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="waist"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Waist [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="hip"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Hip [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="buttocks"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Buttocks [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="thigh"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Thigh [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="calf"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Calf [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="measure_date"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Descrizione</FormLabel> */}
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "PPP")
                                  : format(new Date(), "PPP")}

                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              // disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  // disabled={loading}
                  size="lg"
                  variant="premium"
                  className="w-full"
                >
                  Add
                  <PlusCircle className="w-4 h-4 ml-2 " />
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
};

export default MeasureModal;
