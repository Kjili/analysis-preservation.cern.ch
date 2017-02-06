Terms, Acronyms and Jargon
==========================

Although we try to be clear in our meaning, there are words that might appear and confuse you. Here is a list of words we use regularly and an explanation of their meaning:

.. glossary::

	CAP
		An acronym for CERN Analysis Preservation. If you do not know what that is yet, take a look :doc:`here <../overview/introduction>`.

	Deposit
		We use this as synonym for the analysis form.

	Docker
		An open source software that allows arbitrary software to be wrapped inside a so called "Docker container". This container mimics the environment the software usually runs in. Thus, it can be preserved and run relatively easy.
	
	Docker Container
		see **Docker**

	Invenio
		An open source digital library framework developed at CERN that CERN Analysis Preservation is based on. It provides background functionality like authorization, working with analysis records and storage.

	Invenio-Deposit
		The part of the Invenio framework that in case of CERN Analysis Preservation handles everything directly related to analysis records like permission to view and edit and storage.

	REANA
		A system that schedules and runs analyses on the CERN cloud. It is used to rerun analyses from CERN Analysis Preservation and RECAST.

	REANA Hub
		see **REANA**

	RECAST
		A service based on requests to re-execute an analysis chain with the possibility of using a new signal model. Analysis chains are defined and stored as JSON workflows on CERN Analysis Preservation and rerun using REANA. Analyses are wrapped inside a Docker container.
