import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const Company = () => (
    <>
        <div className="flex justify-center items-center mt-4">
            <Tree
                lineColor="red"
                lineWidth="3px"
                nodePadding="4rem"
                label={
                    <div className="py-4 px-8 inline-block rounded-lg bg-rose-300">
                        <div className="flex items-center justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                alt="Profile Image"
                                className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden object-cover"
                            />
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span className="text-2xl font-bold">Name</span>
                            <span className="text-md">Position</span>
                        </div>
                    </div>
                }
            >
                <TreeNode
                    label={
                        <div className="py-4 px-8 inline-block rounded-lg bg-red-200">
                            <div className="flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                    alt="Profile Image"
                                    className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden object-cover"
                                />
                            </div>
                            <div className="mt-2 flex flex-col">
                                <span className="text-2xl font-bold">Name</span>
                                <span className="text-md">Position</span>
                            </div>
                        </div>
                    }
                >
                    <TreeNode
                        label={
                            <div className="py-4 px-8 inline-block rounded-lg bg-white">
                                <div className="flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                        alt="Profile Image"
                                        className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden object-cover"
                                    />
                                </div>
                                <div className="mt-2 flex flex-col">
                                    <span className="text-2xl font-bold">Name</span>
                                    <span className="text-md">Position</span>
                                </div>
                            </div>
                        }
                    />
                </TreeNode>
                <TreeNode
                    label={
                        <div className="py-4 px-8 inline-block rounded-lg bg-red-200">
                            <div className="flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                    alt="Profile Image"
                                    className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden object-cover"
                                />
                            </div>
                            <div className="mt-2 flex flex-col">
                                <span className="text-2xl font-bold">Name</span>
                                <span className="text-md">Position</span>
                            </div>
                        </div>
                    }
                >
                    <TreeNode
                        label={
                            <div className="py-4 px-8 inline-block rounded-lg bg-white">
                                <div className="flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                        alt="Profile Image"
                                        className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden object-cover"
                                    />
                                </div>
                                <div className="mt-2 flex flex-col">
                                    <span className="text-2xl font-bold">Name</span>
                                    <span className="text-md">Position</span>
                                </div>
                            </div>
                        }
                    />
                </TreeNode>
                <TreeNode
                    label={
                        <div className="py-4 px-8 inline-block rounded-lg bg-red-200">
                            <div className="flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1700585560129-2c03e2a3f511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                                    alt="Profile Image"
                                    className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden object-cover"
                                />
                            </div>
                            <div className="mt-2 flex flex-col">
                                <span className="text-2xl font-bold">Name</span>
                                <span className="text-md">Position</span>
                            </div>
                        </div>
                    }
                />
            </Tree>
        </div>
    </>
);

export default Company;
