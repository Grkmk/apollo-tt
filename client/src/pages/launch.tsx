import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import { LaunchDetail, Header, Loading } from '../components';
import * as LaunchDetailsTypes from './__generated__/LaunchDetails';
import { ActionButton } from '../containers';
import { GET_LAUNCH_DETAILS } from '../queries';

interface LaunchProps extends RouteComponentProps {
  launchId?: any;
}

const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  const { data, loading, error } = useQuery<
    LaunchDetailsTypes.LaunchDetails,
    LaunchDetailsTypes.LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  useEffect(() => {
    if (data.launch && data.launch.mission && data.launch.mission.name) {
      setName(data.launch.mission.name);
    }
    if (
      data.launch &&
      data.launch.mission &&
      data.launch.mission.missionPatch
    ) {
      setImage(data.launch.mission.missionPatch);
    }
  }, [data]);

  return (
    <Fragment>
      <Header image={image}>{name}</Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default Launch;
