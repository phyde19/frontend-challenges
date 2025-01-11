"use client"

import { RefAttributes, useState } from "react"
import { Switch } from "./ui/switch"
import { capitalize } from "@/lib/utils"
import { Check, LucideIcon, X } from "lucide-react"

type PaymentPeriod = 'monthly' | 'yearly'

export default function PlanSelector() {

    const [paymentPeriod, setPaymentPeriod] = useState<PaymentPeriod>('monthly')

    return (
        <div className="flex flex-col items-center w-full">
            <PaymentPeriodSwitch 
                paymentPeriod={paymentPeriod}
                onPaymentPeriodChange={newValue => setPaymentPeriod(newValue)}
            />
            <PricingCards paymentPeriod={paymentPeriod} />
        </div>
    )
}


type PaymentPeriodSwitchProps = {
    paymentPeriod: PaymentPeriod;
    onPaymentPeriodChange: (newValue: PaymentPeriod) => void
}

function PaymentPeriodSwitch({ paymentPeriod, onPaymentPeriodChange }: PaymentPeriodSwitchProps) {

    const switchLabel = (option: string) => {
        return (
            <span className="text-sm font-medium">{option}</span>
        )
    }

    return (
        <div className="flex items-center space-x-3">
            {switchLabel('Monthly')}
            <Switch 
                className="my-12 data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-neutral-200"
                checked={paymentPeriod === "yearly"}
                onCheckedChange={isChecked => onPaymentPeriodChange(isChecked ? (
                    "yearly"
                ): (
                    "monthly"
                ))}
            />
            {switchLabel('Yearly')}
        </div>
    )
}

type Plan = {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    included: string[];
    notIncluded: string[];
}

const plans: Plan[] = [
    {
        name: "basic",
        monthlyPrice: 9,
        yearlyPrice: 90,
        included: [
            '1 user',
            '10 projects',
            '5GB storage',
            'basic support'
        ],
        notIncluded: [
            'advanced analytics',
            'priority support',
            'custom branding'
        ]
    },
    {
        name: "pro",
        monthlyPrice: 19,
        yearlyPrice: 190,
        included: [
            '5 users',
            'unlimited projects',
            '50GB storage',
            'priority support',
            'advanced analytics'
        ],
        notIncluded: [
            'custom branding'
        ]
    },
    {
        name: "enterprise",
        monthlyPrice: 49,
        yearlyPrice: 490,
        included: [
            'unlimited users',
            'unlimited projects',
            'unlimited storage',
            'priority support',
            'advanced analytics',
            'custom branding'
        ],
        notIncluded: []
    }
]

function PricingCards({ paymentPeriod }: { paymentPeriod: PaymentPeriod }) {
    return (
        <div className="xl:max-w-[1280px] lg:max-w-[860px] w-full grid xl:grid-cols-3 sm:grid-cols-2 gap-6">
            {plans.map((plan: Plan) => {
                const price = paymentPeriod === 'monthly'
                    ? plan.monthlyPrice
                    : plan.yearlyPrice
                return (
                    <PlanDisplayCard 
                        key={plan.name}
                        name={plan.name}
                        price={price}
                        period={paymentPeriod}
                        included={plan.included}
                        notIncluded={plan.notIncluded}
                    />
                )
            })}
        </div>
    )
}

type PlanDisplayProps = {
    name: string, 
    price: number, 
    period: PaymentPeriod, 
    included: string[], 
    notIncluded: string[]
}

function PlanDisplayCard({ name, price, period, included, notIncluded }: PlanDisplayProps) {

    return (
        <div className="mb-8 py-6 bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col text-gray-900 px-6">
                <span className="text-lg font-medium">{capitalize(name)}</span>
                <div className="my-4">
                    <span className="font-extrabold text-3xl">${price}</span>
                    <span>/{period}</span>
                </div>
                <span className="mb-4 text-gray-500 font-light text-sm">
                    Billed {period === 'monthly' ? 'monthly' : 'annually'}
                </span>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 font-medium my-6">
                    Get started
                </button>
            </div>
            <div className="p-6">
                <FeatureList
                    title="what's included"
                    Icon={() => <Check className="text-green-500 size-5"/>}
                    features={included}
                />
                <FeatureList
                    title="not included"
                    Icon={() => <X className="text-red-500 size-5"/>}
                    features={notIncluded}
                />
            </div>
        </div>
    )
}

function FeatureList({ title, Icon, features }: { title: string, Icon: () => JSX.Element, features: string[]}) {
    
    if (!features.length) {
        return <></>
    }

    return (
        <div className="flex flex-col text-gray-900 mb-2">
            <span className="font-medium text-sm tracking-wide">
                {title.toUpperCase()}
            </span>
            <div className="my-6 space-y-3">
                {features.map(feature => {
                    return (
                        <div key={feature} className="flex items-center space-x-3">
                            <Icon />
                            <span className="text-gray-500">
                                {feature}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}