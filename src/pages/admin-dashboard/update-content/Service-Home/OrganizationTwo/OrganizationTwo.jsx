import React from 'react';
// import { IconPickerItem } from "react-fa-icon-picker";
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Aos from 'aos';
import { GetAdminOrganizationTwoData } from '../../../../../api/admin/apiAdmin';
import { Link } from 'react-router-dom';
import { http } from '../../../../../components/action/axiosInstance';
import { toast } from 'react-toastify';
import { DeletePopUP } from '../../../../../components/action/DeletePopUP';
import OrganizationTwoModal from './OrganizationTwoModal';
import TableBodyLoading from '../../../../../components/loader/TableBodyLoading';
import { NoDataFound } from '../../../../../components/table/TableComponents';

function OrganizationTwo() {
	const [clickId, setClickId] = useState(1);
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	const { organizationTwoData, refetch, isLoading } =
		GetAdminOrganizationTwoData();

	const handleDelete = (id) => {
		const del = () =>
			http.delete(`/admin/organizationTwo/${id}`).then((res) => {
				toast(res.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				refetch();
			});
		return DeletePopUP(del);
	};

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Admin All Organization-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-contacts">
					<div>
						<h1>All Organization Two</h1>
						<p className="breadcrumbs">
							<span>
								<Link to={'/'}>Home</Link>
							</span>
							<span>
								<i className="mdi mdi-chevron-right"></i>
							</span>
							Home Content
						</p>
					</div>
					<div>
						<Link
							className="btn btn-primary"
							to="/admin/create-organization-two"
						>
							Create Organization Two
						</Link>
					</div>
				</div>
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<table
										id="responsive-data-table"
										className="table"
										style={{ width: '100%' }}
									>
										<thead>
											<tr>
												<th>SL</th>
												<th>Icon</th>
												<th>Title</th>
												<th>Description</th>
												<th>Action</th>
											</tr>
										</thead>
										{isLoading ? (
											<TableBodyLoading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{organizationTwoData?.length > 0 ? (
													organizationTwoData?.map((data, i) => (
														<tr key={data?.id}>
															<td>{i + 1}</td>
															<td>
																{/* <IconPickerItem
                                  icon={data?.icon}
                                  size={24}
                                  color="#000"
                                /> */}
															</td>
															<td>{data?.title}</td>
															<td>
																{data?.description?.length > 120 ? (
																	<>
																		{data?.description?.slice(0, 120) + '...'}
																	</>
																) : (
																	data?.description
																)}
															</td>
															<td>
																<div>
																	<button
																		onClick={() => setClickId(data?.id)}
																		className="btn btn-primary"
																		data-bs-toggle="modal"
																		data-bs-target="#exampleModal"
																	>
																		Update
																	</button>
																	<OrganizationTwoModal
																		organizationTwoRefetch={refetch}
																		clickId={clickId}
																	/>
																	<button
																		onClick={() => handleDelete(data?.id)}
																		className="btn btn-primary bg-danger border border-danger ml-2"
																	>
																		Delete
																	</button>
																</div>
															</td>
														</tr>
													))
												) : (
													<NoDataFound />
												)}
											</tbody>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrganizationTwo;
