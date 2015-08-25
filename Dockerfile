# This file is part of Invenio.
# Copyright (C) 2015 CERN.
#
# Invenio is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# Invenio is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Invenio; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.

FROM invenio:latest
USER root

ADD . /code-overlay
WORKDIR /code-overlay
RUN sed -i '/inveniosoftware\/invenio@/d' requirements.txt && \
    pip install -r requirements.txt --exists-action i && \
    pip install uwsgi

# step back
# in general code should not be writeable, especially because we are using
# `pip install -e`
RUN mkdir -p /code-overlay/src && \
    chown -R invenio:invenio /code-overlay && \
    chown -R root:root /code-overlay/invenio_data && \
    chown -R root:root /code-overlay/setup.* && \
    chown -R root:root /code-overlay/src

# add volumes
# do this AFTER `chown`, because otherwise directory permissions are not
# preserved
VOLUME /code-overlay

USER invenio
EXPOSE 28080
