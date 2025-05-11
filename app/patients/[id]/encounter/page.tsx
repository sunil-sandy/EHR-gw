"use client"

import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, ChevronDown } from "lucide-react"

export default function EncounterPage() {
  const { id } = useParams();

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <div className="text-lg font-semibold">Start Encounter</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-[#5a67f6] hover:bg-[#4550e6] text-white">Save & Publish</Button>
        </div>
      </div>

      {/* Encounter Form */}
      <Card className="p-6 bg-[#f8fafc] rounded-xl shadow">
        <CardContent className="space-y-8">
          {/* Chief Complaints */}
          <div>
            <div className="font-semibold mb-2">Chief Complaints :</div>
            <div className="flex flex-wrap gap-2 mb-2">
              <input className="input input-bordered w-1/3" placeholder="Add Chief Complaint" />
              <select className="input input-bordered w-1/4">
                <option>Eg : Mild</option>
              </select>
              <input className="input input-bordered w-1/4" placeholder="Since When" />
            </div>
            <Button variant="link" className="text-[#5a67f6] px-0"><Plus className="w-4 h-4 mr-1" />Add More</Button>
          </div>

          {/* Examinations */}
          <div>
            <div className="font-semibold mb-2">Examinations :</div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {[
                "Temperature", "Height", "Weight", "Pulse", "Blood Pressure", "SPO2", "Respiratory Rate"
              ].map((label) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">{label}</span>
                  <input type="number" className="input input-bordered w-20" defaultValue={0} />
                </div>
              ))}
            </div>
            <input className="input input-bordered w-full mb-2" placeholder="Examination Notes" />
            <Button variant="link" className="text-[#5a67f6] px-0"><Plus className="w-4 h-4 mr-1" />Add More</Button>
          </div>

          {/* Diagnosis */}
          <div>
            <div className="font-semibold mb-2">Diagnosis :</div>
            <input className="input input-bordered w-1/2" placeholder="Add Diagnosis" />
            <Button variant="link" className="text-[#5a67f6] px-0 ml-2"><Plus className="w-4 h-4 mr-1" />Add More</Button>
          </div>

          {/* Medication */}
          <div>
            <div className="font-semibold mb-2">Medication :</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm mb-2">
                <thead>
                  <tr>
                    <th>Medication Name</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Timing</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paracetamol</td>
                    <td>500 mg - 3 times a day</td>
                    <td>7 days / Until further notice</td>
                    <td>Dr. Rajesh</td>
                    <td>View</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button variant="link" className="text-[#5a67f6] px-0"><Plus className="w-4 h-4 mr-1" />Add More</Button>
          </div>

          {/* Procedure */}
          <div>
            <div className="font-semibold mb-2">Procedure :</div>
            <div className="flex flex-wrap gap-2 mb-2">
              <input className="input input-bordered w-1/3" placeholder="Add Chief Complaint" />
              <select className="input input-bordered w-1/4">
                <option>Eg : Mild</option>
              </select>
              <input className="input input-bordered w-1/4" placeholder="Date" type="date" />
            </div>
            <Button variant="link" className="text-[#5a67f6] px-0"><Plus className="w-4 h-4 mr-1" />Add More</Button>
          </div>

          {/* Investigation */}
          <div>
            <div className="font-semibold mb-2">Investigation :</div>
            <div className="flex flex-wrap gap-2 mb-2">
              <input className="input input-bordered w-1/2" placeholder="Add Test Name" />
              <input className="input input-bordered w-1/2" placeholder="Enter Instructions here" />
            </div>
            <Button variant="link" className="text-[#5a67f6] px-0"><Plus className="w-4 h-4 mr-1" />Add More</Button>
          </div>

          {/* Advice */}
          <div>
            <div className="font-semibold mb-2">Advice</div>
            <input className="input input-bordered w-full" placeholder="Advice" />
          </div>

          {/* Book follow up */}
          <div>
            <div className="font-semibold mb-2">Book follow up appointment</div>
            <input className="input input-bordered w-full" placeholder="Book follow up appointment" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 